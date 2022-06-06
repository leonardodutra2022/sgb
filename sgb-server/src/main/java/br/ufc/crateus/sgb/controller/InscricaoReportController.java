package br.ufc.crateus.sgb.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.report.ReportService;

/**
 * Controlador Rest para manejar API referentes a geração de relatório de inscricao  
 * @author Leonardo Dutra
 * @see ReportService
 *
 */
@RestController
@RequestMapping("/api/relatorio")
public class InscricaoReportController {
	
	@Autowired
	private ReportService reportService;
	
	@GetMapping("/inscricao")
	public ResponseEntity<byte[]> report(
			@RequestParam(required = false) String inscricao, 
			@RequestParam(required = false) String processo) {
		Map<String, Object> params = new HashMap<>();
		params.put("inscricao_id", inscricao);
		params.put("processo_id", processo);
		
		byte[] bytes = reportService.generatePDFReport("inscricao/detalhada/inscricao", params);
		
		return ResponseEntity
				.ok()
				.header("Content-Type", "application/pdf; charset=UTF-8")
				.header("Content-Disposition", "inline; filename=\"" + inscricao + ".pdf\"")
				.body(bytes);
	}

}
