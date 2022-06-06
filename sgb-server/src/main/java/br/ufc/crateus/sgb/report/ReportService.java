package br.ufc.crateus.sgb.report;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IReport;
import br.ufc.crateus.sgb.storage.ArquivoStorage;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.engine.util.JRSaver;

/**
 * Serviço de Relatórios (iReport) para gerar e imprimir ou processar o relatório para posterior exibição ao usuário
 * @author Leonardo Dutra
 * @see ArquivoStorage
 * @see IReport
 */
@Service
public class ReportService implements IReport{

	@Autowired
	private ArquivoStorage storage;
	
	@Autowired
	private DataSource dataSource;
	
	@Override
	public void imprimir(Map<String, Object> parametros, HttpServletResponse response)
			throws JRException, SQLException {
		
	}

	@Override
	public byte[] generatePDFReport(String inputFileName, Map<String, Object> params) {
		return generatePDFReport(inputFileName, params, dataSource);
	}

	@Override
	public byte[] generatePDFReport(String inputFileName, Map<String, Object> params, DataSource dataSource) {
		byte[] bytes = null;
		JasperReport jasperReport = null;
		try (ByteArrayOutputStream byteArray = new ByteArrayOutputStream()) {

			if (storage.jasperFileExists(inputFileName)) {
				jasperReport = (JasperReport) JRLoader
						.loadObject(storage.loadJasperFile(inputFileName));
			} else {
				String jrxml = storage.loadJrxmlFile(inputFileName);
				jasperReport = JasperCompileManager.compileReport(jrxml);

				JRSaver.saveObject(jasperReport,
						storage.loadJasperFile(inputFileName));
			}
			
			JasperPrint jasperPrint;
			try {
				jasperPrint = JasperFillManager.fillReport(jasperReport, params,
						dataSource.getConnection());
				bytes = JasperExportManager.exportReportToPdf(jasperPrint);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		catch (JRException | IOException e) {
			e.printStackTrace();

		}

		return bytes;
	}


}
