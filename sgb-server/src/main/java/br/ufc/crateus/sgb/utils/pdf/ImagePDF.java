package br.ufc.crateus.sgb.utils.pdf;

public class ImagePDF extends AbstractPDF {

	public ImagePDF(String image, String style, int width) {
		this.image = image;
		this.style = style;
		this.width = width;
	}

	public ImagePDF(String image, String style, int[] fit) {
		this.image = image;
		this.style = style;
		this.fit = fit;
	}

	public ImagePDF(String image, String style, int height, int width) {
		this.image = image;
		this.style = style;
		this.width = width;
		this.height = height;
	}
	
	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}
}
