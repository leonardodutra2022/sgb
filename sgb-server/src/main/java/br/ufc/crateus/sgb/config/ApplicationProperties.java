package br.ufc.crateus.sgb.config;

//import javax.validation.constraints.NotNull;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.Resource;
import org.springframework.validation.annotation.Validated;

/**
 * Classe auxiliar para configurar uso de local para relatórios
 * @author Leonardo Dutra
 * @see Resource 
 */
@Validated
@ConfigurationProperties(prefix = "br.ufc")
public class ApplicationProperties {

//	@NotNull
	private Resource storageLocation;

//	@NotNull
	private Resource reportLocation;

	public Resource getStorageLocation() {
		return storageLocation;
	}

	public void setStorageLocation(Resource storageLocation) {
		this.storageLocation = storageLocation;
	}

	public Resource getReportLocation() {
		return reportLocation;
	}

	public void setReportLocation(Resource reportLocation) {
		this.reportLocation = reportLocation;
	}	
}
