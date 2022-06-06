package br.ufc.crateus.sgb.config;

import java.io.File;

import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

/**
 * Classe auxiliar à classe de configuração de uploads de arquivos documentais
 * @author Leonardo Dutra
 *
 */
public class InitUploadConfig extends AbstractAnnotationConfigDispatcherServletInitializer{

	private int maxUploadSizeInMb = 1024 * 1024 * 20; // 5 MB
	
	private File uploadDirectory = new File(System.getProperty("java.io.tmpdir"));
	
	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class[] { FileUploadConfig.class };
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return null;
	}

	@Override
	protected String[] getServletMappings() {
		return null;
	}
	
	private MultipartConfigElement getMultipartConfigElement() {
        MultipartConfigElement multipartConfigElement = new
            MultipartConfigElement(uploadDirectory.getAbsolutePath(),
                maxUploadSizeInMb, maxUploadSizeInMb * 10, maxUploadSizeInMb / 5);
        return multipartConfigElement;
    }
	
	@Override
    protected void customizeRegistration(Dynamic registration) {
        registration.setMultipartConfig(getMultipartConfigElement());
    }

}
