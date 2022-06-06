package br.ufc.crateus.sgb.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.model.Log;
import br.ufc.crateus.sgb.repository.LogRepository;

@RequestMapping("/api/log")
@RestController
public class LogController {

	@Autowired
	private LogRepository logRepository;
	
	@PreAuthorize("hasAuthority('view_user')")
	@PostMapping
	public ResponseEntity<Log> add(@RequestBody Log log) {
		log.setDataHora(new Date());
		logRepository.save(log);
		return new ResponseEntity<Log>(log,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_user')")
	@GetMapping
	public ResponseEntity<Page<Log>> getAllPage(@PageableDefault(direction = Direction.ASC, size = 5, page = 0, sort = "dataHora") Pageable pageable){
		Page<Log> result = this.logRepository.findAll(pageable);
		return new ResponseEntity<Page<Log>>(result, HttpStatus.OK); 
	}
	
}
