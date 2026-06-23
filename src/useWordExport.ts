import {
	AlignmentType,
	Document,
	Header,
	Packer,
	PageNumber,
	Paragraph,
	TabStopPosition,
	TabStopType,
	TextRun,
} from "docx";
import type { Token, Tokens } from "marked";
import { marked } from "marked";

const HEADING_SIZES = [48, 32, 28] as const; // half-points: 24pt, 16pt, 14pt

const inlineToRuns = (
	tokens: Token[],
	bold = false,
	italics = false,
	size = 24,
): TextRun[] => {
	const runs: TextRun[] = [];
	for (const token of tokens) {
		if (token.type === "text") {
			const t = token as Tokens.Text;
			if (t.tokens) {
				runs.push(...inlineToRuns(t.tokens, bold, italics, size));
			} else {
				runs.push(
					new TextRun({ text: t.text, bold, italics, size, color: "000000" }),
				);
			}
		} else if (token.type === "strong") {
			runs.push(
				...inlineToRuns((token as Tokens.Strong).tokens, true, italics, size),
			);
		} else if (token.type === "em") {
			runs.push(...inlineToRuns((token as Tokens.Em).tokens, bold, true, size));
		} else if (token.type === "br") {
			runs.push(new TextRun({ break: 1 }));
		} else if (token.type === "link") {
			const l = token as Tokens.Link;
			runs.push(
				new TextRun({
					text: l.text || l.href,
					bold,
					italics,
					size,
					color: "000000",
					underline: {},
				}),
			);
		} else if (token.type === "html") {
			// skip inline html
		} else if ("text" in token && typeof token.text === "string") {
			runs.push(
				new TextRun({ text: token.text, bold, italics, size, color: "000000" }),
			);
		}
	}
	return runs;
};

const centerHtmlText = (raw: string): string | null => {
	const match = raw.trim().match(/^<center>([\s\S]*?)<\/center>$/i);
	return match ? match[1].trim() : null;
};

const rightHtmlText = (raw: string): string | null => {
	const match = raw.trim().match(/^<right>([\s\S]*?)<\/right>$/i);
	return match ? match[1].trim() : null;
};

const extractTitle = (tokens: Token[]): string => {
	for (const token of tokens) {
		if (token.type === "heading" && (token as Tokens.Heading).depth === 1) {
			return (token as Tokens.Heading).text.replace(/<[^>]+>/g, "").trim();
		}
	}
	return "";
};

const tokensToParagraphs = (tokens: Token[]): Paragraph[] => {
	const paragraphs: Paragraph[] = [];

	for (const token of tokens) {
		if (token.type === "heading") {
			const t = token as Tokens.Heading;
			const size = HEADING_SIZES[Math.min(t.depth - 1, 2)];
			const isCentered = t.text.includes("<center>");
			const textTokens = t.tokens.filter((tk) => tk.type !== "html");
			paragraphs.push(
				new Paragraph({
					children: inlineToRuns(textTokens, true, false, size),
					alignment: isCentered ? AlignmentType.CENTER : AlignmentType.LEFT,
					spacing: { after: 120 },
				}),
			);
		} else if (token.type === "paragraph") {
			const t = token as Tokens.Paragraph;
			if (t.raw.trim().match(/^<p\s*><\/p>$/i)) {
				paragraphs.push(
					new Paragraph({ children: [], spacing: { after: 120 } }),
				);
				continue;
			}
			const paraRightInner = rightHtmlText(t.raw.trim());
			if (paraRightInner !== null) {
				const innerTokens = marked.lexer(paraRightInner);
				const firstToken = innerTokens[0];
				const runs =
					firstToken?.type === "paragraph"
						? inlineToRuns((firstToken as Tokens.Paragraph).tokens)
						: [
								new TextRun({
									text: paraRightInner,
									size: 24,
									color: "000000",
								}),
							];
				paragraphs.push(
					new Paragraph({
						children: runs,
						alignment: AlignmentType.RIGHT,
						spacing: { after: 80 },
					}),
				);
				continue;
			}
			paragraphs.push(
				new Paragraph({
					children: inlineToRuns(t.tokens),
					alignment: AlignmentType.LEFT,
					spacing: { after: 160 },
				}),
			);
		} else if (token.type === "html") {
			const t = token as Tokens.HTML;
			if (t.raw.trim().match(/^<p\s*><\/p>$|^<br\s*\/?>$/i)) {
				paragraphs.push(
					new Paragraph({ children: [], spacing: { after: 120 } }),
				);
				continue;
			}
			const centerInner = centerHtmlText(t.raw);
			if (centerInner) {
				const innerTokens = marked.lexer(centerInner);
				const firstToken = innerTokens[0];
				const runs =
					firstToken?.type === "paragraph"
						? inlineToRuns(
								(firstToken as Tokens.Paragraph).tokens,
								false,
								false,
								22,
							)
						: [new TextRun({ text: centerInner, size: 22, color: "000000" })];
				paragraphs.push(
					new Paragraph({
						children: runs,
						alignment: AlignmentType.CENTER,
						spacing: { after: 160 },
					}),
				);
			}
			const rightInner = rightHtmlText(t.raw);
			if (rightInner) {
				const innerTokens = marked.lexer(rightInner);
				const firstToken = innerTokens[0];
				const runs =
					firstToken?.type === "paragraph"
						? inlineToRuns((firstToken as Tokens.Paragraph).tokens)
						: [new TextRun({ text: rightInner, size: 24, color: "000000" })];
				paragraphs.push(
					new Paragraph({
						children: runs,
						alignment: AlignmentType.RIGHT,
						spacing: { after: 80 },
					}),
				);
			}
		} else if (token.type === "list") {
			const t = token as Tokens.List;
			for (const item of t.items) {
				let runs: TextRun[] = [];
				for (const itemToken of item.tokens) {
					if (itemToken.type === "text") {
						const tt = itemToken as Tokens.Text;
						runs = tt.tokens
							? inlineToRuns(tt.tokens)
							: [new TextRun({ text: tt.text, size: 24, color: "000000" })];
						break;
					} else if (itemToken.type === "paragraph") {
						runs = inlineToRuns((itemToken as Tokens.Paragraph).tokens);
						break;
					}
				}
				if (runs.length === 0) {
					runs = [new TextRun({ text: item.text, size: 24, color: "000000" })];
				}
				paragraphs.push(
					new Paragraph({ children: runs, bullet: { level: 0 } }),
				);
			}
		}
	}

	return paragraphs;
};

const useWordExport = () => {
	const handleWordExport = async (content: string, fileName: string | null) => {
		const tokens = marked.lexer(content);
		const title = extractTitle(tokens);
		const headers = title
			? {
					default: new Header({
						children: [
							new Paragraph({
								children: [
									new TextRun({
										text: `${title}\t`,
										size: 18,
										color: "888888",
									}),
									new TextRun({
										children: [PageNumber.CURRENT],
										size: 18,
										color: "888888",
									}),
								],
								tabStops: [
									{ type: TabStopType.RIGHT, position: TabStopPosition.MAX },
								],
							}),
						],
					}),
				}
			: undefined;
		const doc = new Document({
			sections: [{ headers, children: tokensToParagraphs(tokens) }],
		});
		const blob = await Packer.toBlob(doc);
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = fileName
			? fileName.replace(/\.md$/, ".docx")
			: "document.docx";
		a.click();
		URL.revokeObjectURL(url);
	};

	return { handleWordExport };
};

export default useWordExport;
