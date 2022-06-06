package br.ufc.crateus.sgb.interfaces;

import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import net.sf.jasperreports.engine.JRException;

/**
 * Interface contendo procedimentos padronizados para geração de relatórios  
 * @author Leonardo Dutra
 */
public interface IReport {
	void imprimir(Map<String, Object> parametros, HttpServletResponse response) throws JRException, SQLException;
	byte[] generatePDFReport(String inputFileName, Map<String, Object> params);
	byte[] generatePDFReport(String inputFileName, Map<String, Object> params, DataSource dataSource);
}
