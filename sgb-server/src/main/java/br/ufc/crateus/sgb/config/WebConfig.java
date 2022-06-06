package br.ufc.crateus.sgb.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.accept.ContentNegotiationManager;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.ContentNegotiatingViewResolver;

import br.ufc.crateus.sgb.storage.resolver.CsvViewResolver;
import br.ufc.crateus.sgb.storage.resolver.ExcelViewResolver;
import br.ufc.crateus.sgb.storage.resolver.OdsViewResolver;
import br.ufc.crateus.sgb.storage.resolver.PdfViewResolver;

/**
 * Classe de Configuração referente a exportação de arquivos em alguns formatos especificados
 * @author Leonardo Dutra
 * @see ExcelViewResolver
 * @see CsvViewResolver
 * @see PdfViewResolver
 */
@SuppressWarnings("deprecation")
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter{

	@Override
	public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
	    configurer
	            .defaultContentType(MediaType.APPLICATION_JSON)
	            .favorPathExtension(true);
	}
	
	@Bean
	public ViewResolver contentNegotiatingViewResolver(ContentNegotiationManager manager) {
	    ContentNegotiatingViewResolver resolver = new ContentNegotiatingViewResolver();
	    resolver.setContentNegotiationManager(manager);

	    List<ViewResolver> resolvers = new ArrayList<>();

	    resolvers.add(csvViewResolver());
	    resolvers.add(excelViewResolver());
	    resolvers.add(pdfViewResolver());
	    resolvers.add(odsViewResolver());
	    
	    resolver.setViewResolvers(resolvers);
	    
	    return resolver;
	}
	
	@Bean
	public ViewResolver excelViewResolver() {
	    return new ExcelViewResolver();
	}
	
	@Bean
	public ViewResolver csvViewResolver() {
	    return new CsvViewResolver();
	}
	
	@Bean
	public ViewResolver pdfViewResolver() {
	    return new PdfViewResolver();
	}

	@Bean
	public ViewResolver odsViewResolver() {
	    return new OdsViewResolver();
	}
}
