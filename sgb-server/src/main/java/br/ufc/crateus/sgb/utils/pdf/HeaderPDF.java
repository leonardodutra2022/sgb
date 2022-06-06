package br.ufc.crateus.sgb.utils.pdf;

public class HeaderPDF extends AbstractPDF{

	
	public HeaderPDF() {
	}

	public HeaderPDF(String text) {
		this.style = "itemTable";
		this.text = text;
	}
	
	public HeaderPDF(String text, String style) {
		this.style = style;
		this.text = text;
	}
	
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	
}