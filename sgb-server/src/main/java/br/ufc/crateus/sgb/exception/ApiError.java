package br.ufc.crateus.sgb.exception;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ApiError {

	private int statusCode;
	private String message;
	private List<String> errors;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
	private LocalDateTime timestamp;
	
	public ApiError() {
		
	}
	
	public ApiError(int st, String msg, List<String> errs) {
		super();
		this.errors = errs;
		this.message = msg;
		this.statusCode = st;
	}
	
	public ApiError(int st, String msg, String err) {
		super();
		this.statusCode = st;
		this.message = msg;
		errors = Arrays.asList(err);
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int status) {
		this.statusCode = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<String> getErrors() {
		return errors;
	}

	public void setErrors(List<String> errors) {
		this.errors = errors;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	
}
