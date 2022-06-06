package br.ufc.crateus.sgb.storage.export.abs;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractView;

public abstract class AbstractOdsView extends AbstractView{

	private static final String CONTENT_TYPE = "application/vnd.oasis.opendocument.spreadsheet";
	
	public AbstractOdsView() {
	    setContentType(CONTENT_TYPE);
	}
	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, 
			HttpServletRequest request,
			HttpServletResponse response) 
					throws Exception {
		response.setContentType(getContentType());
		buildOdsDocument(model, request, response);
	}

	@Override
	protected boolean generatesDownloadContent() {
	    return true;
	}
	
	protected abstract void buildOdsDocument(
		Map<String, Object> model, 
		HttpServletRequest request, 
		HttpServletResponse response)
				throws Exception;
}
