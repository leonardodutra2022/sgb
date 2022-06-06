package br.ufc.crateus.sgb.utils;

import java.util.HashMap;
import java.util.Map;

import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Banco;
import br.ufc.crateus.sgb.model.Beneficio;
import br.ufc.crateus.sgb.model.Concessao;
import br.ufc.crateus.sgb.model.Cronograma;
import br.ufc.crateus.sgb.model.DadosAcademicos;
import br.ufc.crateus.sgb.model.Documentacao;
import br.ufc.crateus.sgb.model.DocumentacaoArquivos;
import br.ufc.crateus.sgb.model.Inscricao;
import br.ufc.crateus.sgb.model.Logradouro;
import br.ufc.crateus.sgb.model.LogradouroTipo;
import br.ufc.crateus.sgb.model.OrgaoExpedidor;
import br.ufc.crateus.sgb.model.Processo;
import br.ufc.crateus.sgb.model.Recurso;
import br.ufc.crateus.sgb.model.SituacaoSocioEconFamiliar;
import br.ufc.crateus.sgb.model.Usuario;
import br.ufc.crateus.sgb.model.enums.ListasExportEnum;

/**
 * Classe de utilidades para faciliar a utilizar e troca de formatos e campos por parte do usuario, quando usado opção de exportação
 * @author Leonardo Dutra
 * @see ListasExportEnum
 * @see ObjectUtils
 */
public class ClassUtils{

	private Map<ListasExportEnum, ObjectUtils> listaUtils = new HashMap<ListasExportEnum, ObjectUtils>();
	
	public ClassUtils() {
		listaUtils.put(ListasExportEnum.ALUNOS, new ObjectUtils(Aluno.class));
		listaUtils.put(ListasExportEnum.ALUNOS_VALIDOS, new ObjectUtils(Aluno.class));
		listaUtils.put(ListasExportEnum.BANCOS, new ObjectUtils(Banco.class));
		listaUtils.put(ListasExportEnum.BENEFICIOS, new ObjectUtils(Beneficio.class));
		listaUtils.put(ListasExportEnum.CRONOGRAMA, new ObjectUtils(Cronograma.class));
		listaUtils.put(ListasExportEnum.CONCESSOES, new ObjectUtils(Concessao.class));
		listaUtils.put(ListasExportEnum.DADOS_ACADEMICOS, new ObjectUtils(DadosAcademicos.class));
		listaUtils.put(ListasExportEnum.DOCUMENTACOES, new ObjectUtils(Documentacao.class));
		listaUtils.put(ListasExportEnum.DOCUMENTACAO_ARQUIVOS, new ObjectUtils(DocumentacaoArquivos.class));
		listaUtils.put(ListasExportEnum.INSCRICOES, new ObjectUtils(Inscricao.class));
		listaUtils.put(ListasExportEnum.INFO_BANCO, new ObjectUtils(Aluno.class));
		listaUtils.put(ListasExportEnum.LOGRADOUROS, new ObjectUtils(Logradouro.class));
		listaUtils.put(ListasExportEnum.LOGRADOURO_TIPOS, new ObjectUtils(LogradouroTipo.class));
		listaUtils.put(ListasExportEnum.MORADIA_TRANSPORTE, new ObjectUtils(Inscricao.class));
		listaUtils.put(ListasExportEnum.ORGAOS_EXPEDIDORES, new ObjectUtils(OrgaoExpedidor.class));
		listaUtils.put(ListasExportEnum.PROCESSOS, new ObjectUtils(Processo.class));
		listaUtils.put(ListasExportEnum.RECURSOS, new ObjectUtils(Recurso.class));
		listaUtils.put(ListasExportEnum.SAUDE_DEFICIENCIA, new ObjectUtils(Aluno.class));
		listaUtils.put(ListasExportEnum.SOCIO_ECON_FAMILIAR, new ObjectUtils(SituacaoSocioEconFamiliar.class));
		listaUtils.put(ListasExportEnum.USUARIO, new ObjectUtils(Usuario.class));
	}

	public Map<ListasExportEnum, ObjectUtils> getListaUtils() {
		return listaUtils;
	}
	
	public ObjectUtils getObjectUtil(ListasExportEnum item) {
		return listaUtils.get(item);
	}
}
