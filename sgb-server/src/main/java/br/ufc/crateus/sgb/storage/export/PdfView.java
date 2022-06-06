package br.ufc.crateus.sgb.storage.export;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.WordUtils;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import br.ufc.crateus.sgb.model.enums.ListasExportEnum;
import br.ufc.crateus.sgb.storage.export.abs.AbstractPdfView;
import br.ufc.crateus.sgb.utils.ClassUtils;
import br.ufc.crateus.sgb.utils.IClass;
import br.ufc.crateus.sgb.utils.ObjectUtils;

/**
 * Classe dedicada a gerar arquivo para exportação em formato PDF
 * @author Leonardo Dutra
 * @see AbstractPdfView
 * @see IClass
 * @see ClassUtils
 * @see ListasExportEnum
 * @see ObjectUtils
 */
public class PdfView extends AbstractPdfView implements IClass{

	ClassUtils classUtils = new ClassUtils();
	
	List<Method> metodosUteis = new ArrayList<Method>();
	List<Method> metodosSetados = new ArrayList<Method>();
	
	List<String> atributosUteis = new ArrayList<String>();
	List<String> atributosSetados = new ArrayList<String>();
	
	Map<ListasExportEnum, ObjectUtils> listaTemp = classUtils.getListaUtils();
	
	PdfPTable table = null;
	PdfPCell cell = new PdfPCell();
	Font font = null;
	
	final String PREFIX_METHOD = "get";
		
	
	
	/**
	 * Método responsável por configurar e exportar o documento
	 * @param model Classe do Spring para setar elementos para uso geral na aplicação
	 * @param document Objeto referente ao Documento para ser configurado e exportado
	 * @param writer Objeto da classe PdfWritter para gerar PDF
	 * @param request Servlet de requisição do spring
	 * @param response Servlet de resposta do spring
	 */
	@Override
	protected void buildPdfDocument(Map<String, Object> model, Document document, PdfWriter writer,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		
			response.setHeader("Content-Disposition", "attachment; filename=\"arquivo.pdf\"");
			
			ListasExportEnum itemSelect = (ListasExportEnum) model.get("itemLista");
			List<?> listaSelecionada = (List<?>) model.get("listaGeral");
			Object entidade = model.get("entidade");
			String tituloDoc = model.get("titulo").toString();
			Class<?> classEntidade = (Class<?>) entidade;
			ObjectUtils oUtils = listaTemp.get(itemSelect);
			
			@SuppressWarnings("unchecked")
			List<String> colunas = (List<String>) model.get("colunas");

			
			setup(colunas, classEntidade, oUtils);
			
			document.add(new Paragraph(tituloDoc + " (" + LocalDate.now() + ")"));
			
			setupDocPDF(document, colunas, listaSelecionada);

	}
	
	
	
	/**
	 * Método responsável por criar lista de todos os campos disponíveis para uso, dependendo da entidade que o usuário selecionar
	 * @param classEntidade Entidade selecionada pelo usuário
	 */
	void setListaAtributosUteis(Class<?> classEntidade) {
		atributosUteis.clear();
		for(Field fi : getFields(classEntidade)) {	
			if(!(fi.getType() == boolean.class))
				atributosUteis.add(WordUtils.capitalize(fi.getName()));
		}
	}
	
	
	
	/**
	 * Método responsável por criar uma lista com todos os métodos disponíveis para uso, de acordo com a entidade solicitada
	 * @param oUtils Classe de utilidades acerca de qualquer objeto
	 */
	void setListaMetodosUteis(ObjectUtils oUtils) {
		metodosUteis.clear();
		for(Method me : oUtils.getMethods()) {	
			if(me.getName().startsWith(PREFIX_METHOD))
				metodosUteis.add(me);
		}
	}
	
	
	
	/**
	 * Método responsável por realizar busca por método requisitado e adicionar numa lista de métodos elencados para uso, com base na solicitação do usuário
	 * @param name Título do método para busca e posterior inclusão na lista
	 */
	void setMethods(String name) {
		for(Method m : metodosUteis) {
			if(m.getName().contentEquals(name)) {
				if(!metodosSetados.contains(m))
					metodosSetados.add(m);
			}
		}
	}
	
	
	
	/**
	 * Método responsável por lista os campos que o usuário requisitou para compor o documento, o método realiza uma busca e em seguida vai acrescentando na lista para posterior utilização
	 * @param name Título do campo para busca
	 */
	void setFields(String name) {
		for(String f : atributosUteis) {
			if(f.contentEquals(WordUtils.capitalize(name))) {
				if(!atributosSetados.contains(f))
					atributosSetados.add(f);
			}
		}
	}
	
	
	
	/**
	 * Método responsável por procurar um método requisitado na lista de métodos elencados para uso e retorná-lo para uso
	 * @param name Nome do método para busca e possível utilização em seguida
	 * @return Retorna o método, caso encontrado, para utilização e invocação
	 */
	Method getMethodByName(String name) {
		for(Method m : metodosUteis) {
			if(m.getName() == name)
				return m;
		}
		return null;
	}
	
	
	
	/**
	 * Método responsável por configurar atributos existentes para uso, bem como métodos também, e predefinir nomemclatura dos mesmos para utilização 
	 * @param colunas Lista de colunas setadas pelo usuário
	 * @param classEntidade Entidade .class para uso quando necessário alguma inicialização ou verificação
	 * @param oUtils Classe de utilidades para uso quando se tratar de objetos em geral
	 */
	void setup(List<String> colunas, Class<?> classEntidade, ObjectUtils oUtils) {
		setListaAtributosUteis(classEntidade);
		setListaMetodosUteis(oUtils);

		for(String colunaSet : colunas) {
			String methodName = PREFIX_METHOD + WordUtils.capitalize(colunaSet);

			setMethods(methodName);
			setFields(colunaSet);
		}
	}
	
	
	
	/**
	 * Método responsável por configurar diversos aspectos do documento, para posterior exportação, como: Preferências, Colunas, Linhas ou registros
	 * @param document Objeto relativo ao Documento em si, para configuração
	 * @param colunas Lista de Colunas setadas pelo usuário
	 * @param lista Lista de objetos anônimos, contendo todos os registros para exportação, de acordo com seleção do usuário
	 */
	void setupDocPDF(Document document, List<String> colunas, List<?> lista) {
		table = new PdfPTable(atributosSetados.size());

		setPreferences();	    
	    setCols(colunas);
	    setRows(lista);
	    
	    try {
			document.add(table);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
	}

	
	
	/**
	 * Método responsável por inserir os títulos dos campos em cada coluna de dados, de acordo com os campos requeridos pelo usuário, através da lista de input de colunas
	 * @param colunas Lista de colunas requeridas pelo usuário
	 */
	void setCols(List<String> colunas) {
	    for(String c : colunas) {
		    cell.setPhrase(new Phrase(c, font));
		    table.addCell(cell);
	    }
	}
	
	
	
	/**
	 * Método responsável por iterar linha a linha usando uma lista de registros da entidade requisitada pelo usuário, bem como um conjunto de colunas que serão montadas, 
	 * recebendo uma lista de objetos anônimos onde tais valores serão construídos de forma dinâmica para exportação
	 * @param lista Lista de registros anônimos, a serem iterados no documento para exportar
	 */
	void setRows(List<?> lista) {
	    for(Object valorColuna : lista){
	    	for(Method m : metodosSetados) {
	    		try {
					table.addCell(m.invoke(valorColuna).toString());
				} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
					e.printStackTrace();
				}
	    	}
	    }
	}
	
	
	
	/**
	 * Método responsável por setar configurações de estilo e preferências no documento a ser exportado
	 */
	void setPreferences() {
	    table.setWidthPercentage(100.0f);
	    table.setSpacingBefore(10);
	        
	    font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
	    font.setColor(BaseColor.WHITE);
	    
	    cell.setBackgroundColor(BaseColor.DARK_GRAY);
	    cell.setPadding(5);
	}
}
