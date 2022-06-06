package br.ufc.crateus.sgb.controller;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.exception.ApiError;
import br.ufc.crateus.sgb.interfaces.ICrud;
import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Usuario;
import br.ufc.crateus.sgb.repository.AlunoRepository;
import br.ufc.crateus.sgb.repository.UsuarioRepository;
import br.ufc.crateus.sgb.service.AlunoService;
import br.ufc.crateus.sgb.service.MailService;
import br.ufc.crateus.sgb.service.UsuarioService;

/**
 * Controlador Rest para manejar API referentes a entidade Aluno 
 * @author Leonardo Dutra
 * @see ICrud
 * @see AlunoRepository
 * @see AlunoService
 * @see Aluno
 */
@RequestMapping("/api/aluno")
@RestController
public class AlunoController implements ICrud<Aluno> {
	
	@Autowired
	private AlunoRepository alunoRepository;
	
	@Autowired
	private AlunoService alunoService;

	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private MailService emailService;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	/**
	 * Este método efetua inclusão de registro na base, invocando o método save no repositório
	 * @param aluno Recebe um objeto referente ao corpo da requisição
	 * @return Retorna objeto ResponseEntity com o objeto Aluno, após cadastrado
	 * @apiNote POST > http://localhost:8080/api/aluno
	 * @see Aluno 
	 */
	@PreAuthorize("hasAuthority('add_aluno')")
	@PostMapping
	@Override
	public ResponseEntity<?> add(@RequestBody Aluno aluno) {
		aluno.setUltimaAtualizacaoCadastral(new Date());
		aluno.setDataHora(new Date());
		
		Map<Boolean, ApiError> retorno = this.alunoService.isExist(aluno); 
		
		Aluno alunoTemp = null;
		
		if(retorno.containsKey(false)) {
			Usuario u = new Usuario(aluno);
			u.setDataHora(new Date());
			if(!usuarioService.isExist(u)) {
				usuarioRepository.save(u);
				alunoTemp = alunoRepository.save(aluno);
				
				try {
					emailService.sendCadastroAluno(u.getNomeUsuario(), u.getSenha(), 
							aluno.getEmail().trim());
				} catch (IOException e) {
					e.printStackTrace();
					return new ResponseEntity<Aluno>(aluno,HttpStatus.BAD_REQUEST);
				}
				
				return new ResponseEntity<Aluno>(alunoTemp,HttpStatus.OK);
			}else {
				Map<Boolean, ApiError> r = new HashMap<Boolean, ApiError>(); 
				r.put(true, new ApiError(400, "Erro ao cadastrar usuário para o aluno..", "Reveja os dados informados e tente novamente"));
				return new ResponseEntity<ApiError>(r.get(true),HttpStatus.BAD_REQUEST);
			}
		}else {
			return new ResponseEntity<ApiError>(retorno.get(true),HttpStatus.BAD_REQUEST);
		}
	}

	
	/**
	 * Este método efetua atualização em registro na base, invocando o método save no repositório
	 * @param aluno Recebe um objeto referente ao corpo da requisição
	 * @param id Recebe o ID do registro na base
	 * @return Retorna objeto ResponseEntity com o objeto Aluno, após atualizado
	 * @apiNote PUT > http://localhost:8080/api/aluno
	 * @see Aluno 
	 */
	@PreAuthorize("hasAuthority('edit_aluno')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<Aluno> update(@RequestBody Aluno aluno, @PathVariable long id) {
		if(alunoService.isExist(id)) {
			aluno.setUltimaAtualizacaoCadastral(new Date());
			aluno.setId(id);
			alunoRepository.save(aluno);
			return new ResponseEntity<Aluno>(aluno,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Aluno>(aluno,HttpStatus.NOT_FOUND);
	}

	
	/**
	 * Este método apaga um registro na base, invocando o método deleteById no repositório
	 * @param id Recebe o ID do registro na base
	 * @return Sem retorno
	 * @apiNote DELETE > http://localhost:8080/api/aluno
	 * @see Aluno 
	 */
	@PreAuthorize("hasAuthority('delete_aluno')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(alunoService.isExist(id)) {
			alunoRepository.deleteById(id);			
		}		
	}

	
	/**
	 * Este método obtém todos os registros da base, invocando o método getAll no repositório
	 * @return Retorna lista de alunos ResponseEntity com objetos Aluno
	 * @apiNote GET > http://localhost:8080/api/aluno
	 * @see Aluno 
	 */
	@PreAuthorize("hasAuthority('view_aluno')")
	@GetMapping
	@Override
	public ResponseEntity<List<Aluno>> getAll() {
		List<Aluno> lista = alunoRepository.findAllByOrderByNomeCompletoAsc();
		return new ResponseEntity<List<Aluno>>(lista,HttpStatus.OK);
	}

	
	/**
	 * Este método obtém o registro pelo ID, invocando o método getById no repositório
	 * @param id Recebe o ID do registro na base
	 * @return Retorna objeto ResponseEntity com o objeto Aluno
	 * @apiNote GET > http://localhost:8080/api/aluno
	 * @see Aluno 
	 */
	@PreAuthorize("hasAuthority('view_aluno')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<Aluno> getById(@PathVariable long id) {
		Aluno aluno = alunoRepository.findById(id);
		return new ResponseEntity<Aluno>(aluno,HttpStatus.OK);
	}
	
	
	/**
	 * Este método obtém registro na base por matricula, invocando o método findBySiape no repositório
	 * @param matricula Recebe a matrícula do aluno na base
	 * @return Retorna objeto ResponseEntity com o objeto Aluno, após consulta
	 * @apiNote GET > http://localhost:8080/api/aluno
	 * @see Aluno 
	 */
	@PreAuthorize("hasAuthority('view_aluno')")
	@GetMapping("/search")
	public ResponseEntity<Aluno> getByMatricula(@RequestParam Long matricula){
		Aluno aluno = alunoRepository.findBySiape(matricula);
		return new ResponseEntity<Aluno>(aluno, HttpStatus.OK);
	}
	
	
	/**
	 * Este método obtém registro por CPF na base, invocando o método findByCpf no repositório
	 * @param cpf Recebe o CPF do aluno na base
	 * @return Retorna objeto ResponseEntity com o objeto Aluno, após consulta
	 * @apiNote GET > http://localhost:8080/api/aluno
	 * @see Aluno 
	 */
	@PreAuthorize("hasAuthority('view_aluno')")
	@GetMapping("/getByCpf")
	public ResponseEntity<Aluno> getByCpf(@RequestParam String cpf){
		Aluno aluno = alunoRepository.findByCpf(cpf);
		return new ResponseEntity<Aluno>(aluno, HttpStatus.OK);
		
	}
	
	
	/**
	 * Este método obtém uma lista geral de alunos que foram cadastrados previamente pela comissão, onde tais registros ainda
	 * terão que completar seu cadastro, invocando o método findGeral no repositório
	 * @return Retorna lista de objetos ResponseEntity com Alunos, após consulta
	 * @apiNote GET > http://localhost:8080/api/aluno
	 * @see Aluno 
	 */
	@PreAuthorize("hasAuthority('edit_aluno')")
	@GetMapping("/type")
	public ResponseEntity<List<Aluno>> getByAlunoGeral(){
		List<Aluno> alunos = alunoRepository.findGeral();
		return new ResponseEntity<List<Aluno>>(alunos, HttpStatus.OK);
	}

}
