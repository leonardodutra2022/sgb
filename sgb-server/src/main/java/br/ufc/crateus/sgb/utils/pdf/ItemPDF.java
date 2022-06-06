package br.ufc.crateus.sgb.utils.pdf;

public class ItemPDF extends AbstractPDF{
	
	public ItemPDF() {
		
	}

	public ItemPDF(String text) {
		super(text);
	}
	
	public ItemPDF(String text, String style) {
		super(text, style);
	}

	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	
}
