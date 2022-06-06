package br.ufc.crateus.sgb.utils.pdf;

public abstract class AbstractPDF {

	String text;
	String style;
	int width;
	int height;
	int[] fit;
	String image;
	
	public AbstractPDF() {
		
	}
	
	public AbstractPDF(String text, String style) {
		this.text = text;
		this.style = style;
	}
	
	public AbstractPDF(String text) {
		this.text = text;
	}
	
	public String getStyle() {
		return style;
	}
	public void setStyle(String style) {
		this.style = style;
	}
	
}
