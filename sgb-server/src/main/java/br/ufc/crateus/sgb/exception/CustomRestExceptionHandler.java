package br.ufc.crateus.sgb.exception;

import java.io.IOException;
import java.time.LocalDateTime;

import javax.persistence.NonUniqueResultException;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomRestExceptionHandler extends ResponseEntityExceptionHandler{
	
	@ExceptionHandler(RegisterNotFoundException.class)
	public ResponseEntity<ApiError> springHandlerNotFound(Exception e, WebRequest request) throws IOException{
		
		HttpStatus st = HttpStatus.NOT_FOUND;
		
		ApiError errors = new ApiError();
		errors.setMessage(e.getMessage());
		errors.setTimestamp(LocalDateTime.now());
		errors.setStatusCode(st.value());
		
		return new ResponseEntity<ApiError>(errors, st);
	}
	
	@ExceptionHandler(CpfInvalidoException.class)
	public ResponseEntity<ApiError> springHandlerCpfInvalido(Exception e, WebRequest request) throws Exception{
		
		HttpStatus st = HttpStatus.BAD_REQUEST;
		
		ApiError errors = new ApiError();
		errors.setMessage(e.getMessage());
		errors.setTimestamp(LocalDateTime.now());
		errors.setStatusCode(st.value());
		
		return new ResponseEntity<ApiError>(errors, st);
	}
	
	@ExceptionHandler(RegisterExistException.class)
	public ResponseEntity<ApiError> springHandlerRegisterExis(Exception e, WebRequest request) throws IOException{
		
		HttpStatus st = HttpStatus.BAD_REQUEST;
		
		ApiError errors = new ApiError();
		errors.setMessage("Dados já existentes, favor alterá-los");
		errors.setTimestamp(LocalDateTime.now());
		errors.setStatusCode(st.value());
		
		return new ResponseEntity<ApiError>(errors, st);
	}
	
	
//    @ExceptionHandler(ConstraintViolationException.class)
//    public void constraintViolationException(HttpServletResponse response) throws IOException {
//        response.sendError(HttpStatus.BAD_REQUEST.value());
//    }
    
    @ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<ApiError> constraintViolationException(Exception e, WebRequest request) throws Exception{
		
		HttpStatus st = HttpStatus.BAD_REQUEST;
		
		ApiError errors = new ApiError();
		errors.setMessage("Registro Já Existente. Reconfigure o perfil atual!");
		errors.setTimestamp(LocalDateTime.now());
		errors.setStatusCode(st.value());
		
		return new ResponseEntity<ApiError>(errors, st);
	}
    
    @ExceptionHandler(NonUniqueResultException.class)
	public ResponseEntity<ApiError> nonUniqueResultException(Exception e, WebRequest request) throws Exception{
		
		HttpStatus st = HttpStatus.BAD_REQUEST;
		
		ApiError errors = new ApiError();
		errors.setMessage("Consulta retornou mais de um objeto para a atual busca");
		errors.setTimestamp(LocalDateTime.now());
		errors.setStatusCode(st.value());
		
		return new ResponseEntity<ApiError>(errors, st);
	}
    
}
