package br.ufc.crateus.sgb.storage.resolver;

import java.util.Locale;

import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;

import br.ufc.crateus.sgb.storage.export.PdfView;

/**
 * Classe dedicada a fornecer e prepara a visualização ou obtenção de procedimentos para arquivos de exportação em formato PDF
 * @author Leonardo Dutra
 */
public class PdfViewResolver implements ViewResolver{

	@Override
	public View resolveViewName(String viewName, Locale locale) throws Exception {
		return new PdfView();
	}

}
