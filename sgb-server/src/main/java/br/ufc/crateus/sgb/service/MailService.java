package br.ufc.crateus.sgb.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Calendar;

import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Beneficio;
import br.ufc.crateus.sgb.model.Inscricao;
import br.ufc.crateus.sgb.model.Processo;
import br.ufc.crateus.sgb.model.Usuario;
import br.ufc.crateus.sgb.utils.ReadFileUtil;

@Component
@Service
@Configuration
public class MailService {

	//Value("${my.property.link}")
	//private String LINK;

	private static final String UTF_8 = "UTF-8";
	private static final String TEXT_HTML_CHARSET_UTF_8 = "text/html; charset=utf-8";
	private static final String CONFIRMATION_EMAIL = "/files/confirmationEmail.html";
	private static final String NOTIFY_RESULT_PARTIAL_EMAIL = "/files/notifyResultadoParcialEmail.html";
	private static final String NOTIFY_RESULT_FINAL_EMAIL = "/files/notifyResultadoFinalEmail.html";
	private static final String NOTIFY_RECURSO_EMAIL = "/files/notifyRecursoEmail.html";
	private static final String NOTIFY_RECURSO_PARECER_EMAIL = "/files/notifyRecursoParecerEmail.html";
	private static final String NOTIFY_INSCRICAO_CANCELADA_EMAIL = "/files/notifyInscricaoCanceladaEmail.html";
	private static final String RECOVER_EMAIL = "/files/recoverEmail.html";
	private static final String CADASTRO_ALUNO_EMAIL = "/files/cadastroAlunoEmail.html";
	private static final String GUEST_NAME = "GUEST-NAME";
	private static final String USUARIO = "USUARIO";
	private static final String SENHA = "SENHA";
	private static final String BENEFICIO_NOME = "BENEFICIO-NOME";
	private static final String COD_INSCRICAO = "COD-INSCRICAO";
	private static final String DATA_INSCRICAO = "DATA-INSCRICAO";
	private static final String DESC_PROCESSO = "DESC-PROCESSO";
	private static final String SGB_EMAIL = "HEMOCE-EMAIL";
	
	private static final String RELATORIO_PRELIMINAR_COMISSAO = "RELATORIO-PRELIMINAR-COMISSAO";
	private static final String RELATORIO_FINAL_COMISSAO = "RELATORIO-FINAL-COMISSAO";
	private static final String PARECER_PRELIMINAR_COMISSAO = "PARECER-PRELIMINAR-COMISSAO";
	private static final String PARECER_FINAL_COMISSAO = "PARECER-FINAL-COMISSAO";
	
	private static final String CREDENCIAIS_DOCENTE_EMAIL = "/files/credenciaisDocenteEmail.html";

	@Autowired
	private JavaMailSender emailSender;
	
	//@Value("${spring.mail.username}")
	private String EMAIL_FROM = "sgb.ufc.crateus@gmail.com";
	
	//@Value("${my.property.from}")
	private String FROM = "sgb";
	
	private String SUBJECT = "[Bolsas e Auxílios UFC] ";
	
	public void setEmailSender(JavaMailSender mailSender) {
		this.emailSender = mailSender;
	}

	public void sendMail(Aluno aluno, Inscricao inscricao) throws IOException {
		sendConfirmationEmail(aluno, inscricao);
	}

	public void sendConfirmationEmail(Aluno aluno, Inscricao inscricao) throws IOException {
		String template = getConfirmationMailTemplate(aluno, inscricao);
		send(aluno, inscricao, template);
	}

	public void sendRecoverEmail(String email, Usuario usuario) throws IOException {
		String template = recoverMailTemplate(usuario);
		sendRecover(template, email, usuario);
	}
	
	public void sendCadastroAluno(String username, String pass, String emailAluno) throws IOException {
		String template = cadastroAlunoMailTemplate(username, pass);
		sendCadastroAluno(template, username, pass, emailAluno.trim());
	}

	public void sendNotificationEmail(Aluno aluno) throws IOException {

		MimeMessage message = emailSender.createMimeMessage();

		try {
			message.setFrom(new InternetAddress(FROM));
			message.setRecipient(javax.mail.Message.RecipientType.TO, new InternetAddress(EMAIL_FROM));
			message.setSubject(SUBJECT + " aluno", UTF_8);
			message.setContent("asdfasd", TEXT_HTML_CHARSET_UTF_8);
		} catch (AddressException e) {

		} catch (MessagingException e) {

		}
		emailSender.send(message);
	}


	private void send(Aluno aluno, Inscricao inscricao, String template) {
		MimeMessage message = emailSender.createMimeMessage();
		
		try {
			message.setFrom(new InternetAddress(FROM));
			message.setRecipient(RecipientType.TO, new InternetAddress(aluno.getEmail().trim()));
			
			message.setSubject(SUBJECT + " Inscrição Bolsas/Auxílios UFC/CCRATEUS", UTF_8);

			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(template, TEXT_HTML_CHARSET_UTF_8);
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);

			message.setContent(multipart, TEXT_HTML_CHARSET_UTF_8);
			emailSender.send(message);
		} catch (Exception e) {
			return;
		}
	}
	
	private void sendNotifyResultadoParcial(Aluno aluno, Inscricao inscricao, String template) {
		MimeMessage message = emailSender.createMimeMessage();
		
		try {
			message.setFrom(new InternetAddress(FROM));
			message.setRecipient(RecipientType.TO, new InternetAddress(aluno.getEmail().trim()));
			
			message.setSubject(SUBJECT + " Resultado Parcial Publicado UFC/CCRATEUS", UTF_8);

			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(template, TEXT_HTML_CHARSET_UTF_8);
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);

			message.setContent(multipart, TEXT_HTML_CHARSET_UTF_8);
			emailSender.send(message);
		} catch (Exception e) {
			return;
		}
	}
	
	private void sendRecover(String template, String email, Usuario usuario) {
		MimeMessage message = emailSender.createMimeMessage();

		try {
			message.setFrom(new InternetAddress(FROM));
			message.setRecipient(RecipientType.TO, new InternetAddress(email));

			message.setSubject(SUBJECT + "Dados de Acesso - Sistema de Auxílios/Bolsas", UTF_8);
			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(template, TEXT_HTML_CHARSET_UTF_8);
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);

			message.setContent(multipart, TEXT_HTML_CHARSET_UTF_8);



			emailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private void sendCadastroAluno(String template, String username, String pass, String emailAluno) {
		MimeMessage message = emailSender.createMimeMessage();

		try {
			message.setFrom(new InternetAddress(FROM));
			message.setRecipient(RecipientType.TO, new InternetAddress(emailAluno));
			
			message.setSubject(SUBJECT + "Dados de Acesso - Sistema de Auxílios/Bolsas", UTF_8);

			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(template, TEXT_HTML_CHARSET_UTF_8);
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);

			message.setContent(multipart, TEXT_HTML_CHARSET_UTF_8);
			emailSender.send(message);
		} catch (Exception e) {
			return;
		}
	}
	
	private void sendCredenciaisDocente(String template, String email) {
		MimeMessage message = emailSender.createMimeMessage();

		try {
			message.setFrom(new InternetAddress(FROM));
			message.setRecipient(RecipientType.TO, new InternetAddress(email.trim()));
			
			message.setSubject(SUBJECT + "Dados de Acesso - Sistema de Auxílios/Bolsas", UTF_8);

			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(template, TEXT_HTML_CHARSET_UTF_8);
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);

			message.setContent(multipart, TEXT_HTML_CHARSET_UTF_8);
			emailSender.send(message);
		} catch (Exception e) {
			return;
		}
	}

	private String getConfirmationMailTemplate(Aluno aluno, Inscricao inscricao) throws IOException {

		Processo p = inscricao.getProcesso();
		Beneficio b = p.getBeneficio();
		
		String guestName = aluno.getNomeCompleto().trim();
		
		@SuppressWarnings("deprecation")
		String date = Calendar.getInstance().getTime().toLocaleString();
		String descProcesso = p.getDescricao().trim();

		String template = ReadFileUtil.readFile(MailService.class.getResourceAsStream(CONFIRMATION_EMAIL));

		template = template.replace(GUEST_NAME, guestName);
		template = template.replace(BENEFICIO_NOME, b.getNome().trim());
		template = template.replace(COD_INSCRICAO, p.getId() + ".0" + inscricao.getId() + "/" + LocalDate.now().getYear());
		template = template.replace(DATA_INSCRICAO, date);
		template = template.replace(DESC_PROCESSO, descProcesso);
		template = template.replace(SGB_EMAIL, EMAIL_FROM);

		return template;

	}
	
	private String getResultadoParcialMailTemplate(Aluno aluno, Inscricao inscricao) throws IOException {

		Processo p = inscricao.getProcesso();
		Beneficio b = p.getBeneficio();
		
		String guestName = aluno.getNomeCompleto().trim();
		
		@SuppressWarnings("deprecation")
		String date = Calendar.getInstance().getTime().toLocaleString();
		String descProcesso = p.getDescricao().trim();

		String template = ReadFileUtil.readFile(MailService.class.getResourceAsStream(NOTIFY_RESULT_PARTIAL_EMAIL));

		template = template.replace(GUEST_NAME, guestName);
		template = template.replace(BENEFICIO_NOME, b.getNome().trim());
		template = template.replace(COD_INSCRICAO, p.getId() + ".0" + inscricao.getId() + "/" + LocalDate.now().getYear());
		template = template.replace(DATA_INSCRICAO, date);
		template = template.replace(DESC_PROCESSO, descProcesso);
		template = template.replace(SGB_EMAIL, EMAIL_FROM);
		template = template.replace(RELATORIO_PRELIMINAR_COMISSAO, (inscricao.getAnaliseComissao() == null ? "-" : inscricao.getAnaliseComissao()));
		template = template.replace(PARECER_PRELIMINAR_COMISSAO, (inscricao.getSituacao() == null ? "-" : inscricao.getSituacao().toString()));

		return template;

	}
	
	private String recoverMailTemplate(Usuario usuario) throws IOException {

		String template = ReadFileUtil.readFile(MailService.class.getResourceAsStream(RECOVER_EMAIL));

		template = template.replace(USUARIO, usuario.getNomeUsuario());
		template = template.replace(SENHA, usuario.getSenha());
		template = template.replace(SGB_EMAIL, EMAIL_FROM);

		return template;

	}
	
	private String cadastroAlunoMailTemplate(String username, String pass) throws IOException {

		String template = ReadFileUtil.readFile(MailService.class.getResourceAsStream(CADASTRO_ALUNO_EMAIL));

		template = template.replace(USUARIO, username);
		template = template.replace(SENHA, pass);
		template = template.replace(SGB_EMAIL, EMAIL_FROM);

		return template;

	}

	public void notificacaoResultadoParcialEmail(Aluno a, Inscricao i) throws IOException{
		String template = getResultadoParcialMailTemplate(a, i);
		sendNotifyResultadoParcial(a, i, template);
	}

	public void notificacaoResultadoFinalEmail(Aluno a, Inscricao i) throws IOException{
		String template = getResultadoFinalMailTemplate(a, i);
		sendNotifyResultadoFinal(a, i, template);
	}

	private void sendNotifyResultadoFinal(Aluno a, Inscricao i, String template) {
		MimeMessage message = emailSender.createMimeMessage();
		
		try {
			message.setFrom(new InternetAddress(FROM));
			message.setRecipient(RecipientType.TO, new InternetAddress(a.getEmail().trim()));
			
			message.setSubject(SUBJECT + " Resultado Final Publicado UFC/CCRATEUS", UTF_8);

			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(template, TEXT_HTML_CHARSET_UTF_8);
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);

			message.setContent(multipart, TEXT_HTML_CHARSET_UTF_8);
			emailSender.send(message);
		} catch (Exception e) {
			return;
		}
	}

	private String getResultadoFinalMailTemplate(Aluno a, Inscricao i) throws IOException {
		
		Processo p = i.getProcesso();
		Beneficio b = p.getBeneficio();
		
		String guestName = a.getNomeCompleto().trim();
		
		@SuppressWarnings("deprecation")
		String date = Calendar.getInstance().getTime().toLocaleString();
		String descProcesso = p.getDescricao().trim();

		String template = ReadFileUtil.readFile(MailService.class.getResourceAsStream(NOTIFY_RESULT_FINAL_EMAIL));

		template = template.replace(GUEST_NAME, guestName);
		template = template.replace(BENEFICIO_NOME, b.getNome().trim());
		template = template.replace(COD_INSCRICAO, p.getId() + ".0" + i.getId() + "/" + LocalDate.now().getYear());
		template = template.replace(DATA_INSCRICAO, date);
		template = template.replace(DESC_PROCESSO, descProcesso);
		template = template.replace(SGB_EMAIL, EMAIL_FROM);
		template = template.replace(RELATORIO_FINAL_COMISSAO, (i.getAnaliseComissaoFinal() == null ? "-" : i.getAnaliseComissaoFinal()));
		template = template.replace(PARECER_FINAL_COMISSAO, (i.getSituacaoFinal() == null ? "-" : i.getSituacaoFinal().toString()));

		return template;
		
	}

	public void notificacaoRecursoEmail(Aluno a, Inscricao i) throws IOException{
		String template = getRecursoMailTemplate(a, i);
		sendNotifyRecurso(a, i, template);
	}

	private void sendNotifyRecurso(Aluno a, Inscricao i, String template) {
		MimeMessage message = emailSender.createMimeMessage();
		
		try {
			message.setFrom(new InternetAddress(FROM));
			message.setRecipient(RecipientType.TO, new InternetAddress(a.getEmail().trim()));
			
			message.setSubject(SUBJECT + " Recursos UFC/CCRATEUS", UTF_8);

			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(template, TEXT_HTML_CHARSET_UTF_8);
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);

			message.setContent(multipart, TEXT_HTML_CHARSET_UTF_8);
			emailSender.send(message);
		} catch (Exception e) {
			return;
		}
	}

	private String getRecursoMailTemplate(Aluno a, Inscricao i) throws IOException{
		Processo p = i.getProcesso();
		Beneficio b = p.getBeneficio();
		
		String guestName = a.getNomeCompleto().trim();
		
		@SuppressWarnings("deprecation")
		String date = Calendar.getInstance().getTime().toLocaleString();
		String descProcesso = p.getDescricao().trim();

		String template = ReadFileUtil.readFile(MailService.class.getResourceAsStream(NOTIFY_RECURSO_EMAIL));

		template = template.replace(GUEST_NAME, guestName);
		template = template.replace(BENEFICIO_NOME, b.getNome().trim());
		template = template.replace(COD_INSCRICAO, p.getId() + ".0" + i.getId() + "/" + LocalDate.now().getYear());
		template = template.replace(DATA_INSCRICAO, date);
		template = template.replace(DESC_PROCESSO, descProcesso);
		template = template.replace(SGB_EMAIL, EMAIL_FROM);
		template = template.replace(RELATORIO_PRELIMINAR_COMISSAO, (i.getAnaliseComissao() == null ? "-" : i.getAnaliseComissao()));
		template = template.replace(PARECER_PRELIMINAR_COMISSAO, (i.getSituacao() == null ? "-" : i.getSituacao().toString()));

		return template;
	}

	public void notificacaoRecursoParecerEmail(Aluno a, Inscricao i) throws IOException{
		String template = getRecursoParecerMailTemplate(a, i);
		sendNotifyRecursoParecer(a, i, template);
	}

	private void sendNotifyRecursoParecer(Aluno a, Inscricao i, String template) {
		MimeMessage message = emailSender.createMimeMessage();
		
		try {
			message.setFrom(new InternetAddress(FROM));
			message.setRecipient(RecipientType.TO, new InternetAddress(a.getEmail().trim()));
			
			message.setSubject(SUBJECT + " Parecer(es) do(s) Recurso(s) UFC/CCRATEUS", UTF_8);

			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(template, TEXT_HTML_CHARSET_UTF_8);
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);

			message.setContent(multipart, TEXT_HTML_CHARSET_UTF_8);
			emailSender.send(message);
		} catch (Exception e) {
			return;
		}
	}

	private String getRecursoParecerMailTemplate(Aluno a, Inscricao i) throws IOException{
		Processo p = i.getProcesso();
		Beneficio b = p.getBeneficio();
		
		String guestName = a.getNomeCompleto().trim();
		
		String descProcesso = p.getDescricao().trim();

		String template = ReadFileUtil.readFile(MailService.class.getResourceAsStream(NOTIFY_RECURSO_PARECER_EMAIL));

		template = template.replace(GUEST_NAME, guestName);
		template = template.replace(BENEFICIO_NOME, b.getNome().trim());
		template = template.replace(COD_INSCRICAO, p.getId() + ".0" + i.getId() + "/" + LocalDate.now().getYear());
		template = template.replace(DESC_PROCESSO, descProcesso);
		template = template.replace(SGB_EMAIL, EMAIL_FROM);

		return template;
	}

	public void notificacaoInscricaoCanceladaEmail(Aluno a, Inscricao i) throws IOException{
		String template = getInscricaoCanceladaMailTemplate(a, i);
		sendNotifyInscricaoCancelada(a, i, template);
	}

	private void sendNotifyInscricaoCancelada(Aluno a, Inscricao i, String template) {
		MimeMessage message = emailSender.createMimeMessage();
		
		try {
			message.setFrom(new InternetAddress(FROM));
			message.setRecipient(RecipientType.TO, new InternetAddress(a.getEmail().trim()));
			
			message.setSubject(SUBJECT + " Inscrição Cancelada UFC/CCRATEUS", UTF_8);

			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(template, TEXT_HTML_CHARSET_UTF_8);
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);

			message.setContent(multipart, TEXT_HTML_CHARSET_UTF_8);
			emailSender.send(message);
		} catch (Exception e) {
			return;
		}
	}

	private String getInscricaoCanceladaMailTemplate(Aluno a, Inscricao i) throws IOException{
		Processo p = i.getProcesso();
		Beneficio b = p.getBeneficio();
		
		String guestName = a.getNomeCompleto().trim();
		
		String descProcesso = p.getDescricao().trim();

		String template = ReadFileUtil.readFile(MailService.class.getResourceAsStream(NOTIFY_INSCRICAO_CANCELADA_EMAIL));

		template = template.replace(GUEST_NAME, guestName);
		template = template.replace(BENEFICIO_NOME, b.getNome().trim());
		template = template.replace(DESC_PROCESSO, descProcesso);
		template = template.replace(SGB_EMAIL, EMAIL_FROM);

		return template;
	}

	public void sendCredenciaisDocenteEmail(Usuario usuario) throws IOException {
		String template = credenciaisDocenteMailTemplate(usuario);
		String email = usuario.getEmail();
		sendCredenciaisDocente(template, email);
	}
	
	private String credenciaisDocenteMailTemplate(Usuario usuario) throws IOException {

		String template = ReadFileUtil.readFile(MailService.class.getResourceAsStream(CREDENCIAIS_DOCENTE_EMAIL));

		template = template.replace(USUARIO, usuario.getNomeUsuario());
		template = template.replace(SENHA, usuario.getSenha());
		template = template.replace(SGB_EMAIL, EMAIL_FROM);

		return template;

	}


}
