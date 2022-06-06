package br.ufc.crateus.sgb.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Classe de Configuração referente ao CORS
 * @author Leonardo Dutra
 */
@SuppressWarnings("deprecation")
@Configuration
@EnableWebMvc
public class CORSConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**").allowedOrigins("*").allowCredentials(true).allowedHeaders("Content-Type",
				"Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Authorization", "X-Requested-With", 
				"Access-Control-Request-Method", "Access-Control-Request-Headers", "Origin", "Accept", "responseType")
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
		registry.addMapping("/public/api/**")
				.allowedOrigins("*")
				.allowedHeaders("*")
				.allowedMethods("GET", "POST", "PUT", "OPTIONS");
	}
}
