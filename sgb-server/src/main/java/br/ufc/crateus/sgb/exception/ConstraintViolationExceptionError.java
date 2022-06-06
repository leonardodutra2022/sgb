package br.ufc.crateus.sgb.exception;


import org.springframework.web.bind.annotation.ResponseStatus;

import java.sql.SQLException;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;


@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ConstraintViolationExceptionError extends ConstraintViolationException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public ConstraintViolationExceptionError(String message, SQLException root, String constraintName) {
		super("O Perfil atual já existe no banco de dados, reconfigure!", root, constraintName);
	}

//	public ConstraintViolationExceptionError(String message) {
//		super("O Perfil atual já existe no banco de dados, reconfigure!");
//	}


}
