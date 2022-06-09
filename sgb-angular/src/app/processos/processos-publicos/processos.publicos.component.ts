import { Component, OnInit } from '@angular/core';
import { API_SGB, API_SGB_PUBLIC } from 'src/app/config/API';
import { Beneficio } from 'src/app/model/beneficio';
import { AuthService } from 'src/app/service/auth.service';
import { DocumentacaoArquivosService } from 'src/app/service/documentacao.arquivos.service';
import { ProcessosService } from 'src/app/service/processos.service';
import { SessaoService } from 'src/app/service/sessao.service';

const URL_DOWNLOAD = API_SGB_PUBLIC + "/download";

class ProcessosList {
  idProcesso : string;
  statusProcesso:string;
  statusProcessoResume:string;
  descricao:string;
  ano:string;
  dataAbertura:string;
  docsOficiais : DocOficial[];
  hasEntrevista : boolean = false;
  beneficio : Beneficio;
  cronogramaLink : string;
}

interface DocOficial {
  idDoc: string;
  dataPostagem : string;
  numEdital: string;
  descricao : string;
  tipo: string;
}


@Component({
  selector: 'app-processos-publicos',
  templateUrl: './processos.publicos.component.html',
  styleUrls: ['./processos.publicos.component.scss']
})
export class ProcessosPublicosComponent implements OnInit {

  listaProcessos : ProcessosList[] = [];
  docsProcessos : DocOficial[] = [];
  link = URL_DOWNLOAD;
  linkCronograma : string = '';

  constructor(private processosService : ProcessosService, 
    private docArquivosService: DocumentacaoArquivosService,
    private sessaoService : SessaoService) { }

  ngOnInit() {
    this.setListaProcessos();
  }

  setDocsLista(){
    for(let p of this.listaProcessos){
            this.docArquivosService.getDocsOficiaisPublicoByProcesso(p.idProcesso)
              .subscribe(
                temp => {
                  let listItensTemp : DocOficial[] = [];
                  for(let d of temp){
                    
                    var docTipo = "";
                    switch(d.docTipo){
                      case "EDITAL":
                        docTipo = "Edital"
                        break;
                      case "ADITIVO_EDITAL":
                        docTipo = "Aditivo/Retificação ao Edital";
                        break;
                      case "PORTARIA":
                        docTipo = "Portaria";
                        break;
                      case "CRONOGRAMA":
                          p.cronogramaLink = this.link + "/" + d.id;
                          docTipo = "Cronograma";
                        break;
                      default:
                          docTipo = 'Outro documento';
                    }

                    let item : DocOficial = 
                     {idDoc: d.id, dataPostagem: d.dataPostagem, descricao: d.descricao, 
                      numEdital: d.id, tipo: docTipo};
                        
                    listItensTemp.push(item)

                  }
                  p.docsOficiais = listItensTemp;
                  // this.docsProcessos = listItensTemp;
                }
              );
            }
            this.docsProcessos = [];
            
  }

  getCronograma() : string {
    return this.linkCronograma;
  }

  getDocByIdList(id) : boolean{
    for(let d of this.docsProcessos){
      if(d.idDoc == id)
        return true;
    }
  }

  getResumeStatus(st) : string {
    switch(st){
      case "ANALISE_DOCUMENTAL":
        return "Análise Documental";
        break;
      case "RESULTADO_FINAL":
        return "Resultado Final (Após Recursos)";
        break;
      case "RESULTADO_PARCIAL":
        return "Resultado Parcial";
        break;
      case "INSCRICOES_ABERTAS":
        return "Inscrições Abertas";
        break;
      case "ANDAMENTO":
        return "Em Andamento";
        break;
      case "SUSPENSO":
        return "Processo Suspenso";
        break;
      case "RECURSO":
        return "Etapa de Recursos";
        break;
      case "CONCLUIDO":
        return "Processo Concluído";
        break;
      case "VISITA":
        return "Etapa de Visitas";
        break;
      case "RECURSO_PARECER":
        return "Resultado dos Recursos Interpostos";
        break;
      case "ENTREVISTA":
        return "Etapa de Entrevistas";
    }
  }

  setListaProcessos(){
    this.processosService.getProcessosPublicos()
    .subscribe(
      listaTemp => 
        {
          for(let b of listaTemp){
            var itemProc : ProcessosList = new ProcessosList
            itemProc.ano = b.ano
            itemProc.dataAbertura = b.dataAbertura
            itemProc.idProcesso = b.id
            itemProc.statusProcesso = b.statusProcesso
            itemProc.descricao = b.descricao
            itemProc.beneficio = b.beneficio
            itemProc.hasEntrevista = b.possuiEntrevista;
            
            itemProc.statusProcessoResume = this.getResumeStatus(itemProc.statusProcesso);

            this.listaProcessos.push(itemProc) 
          }
          this.setDocsLista();
        }
    ); 
  }

  checkSessao() : boolean{
    return this.sessaoService.sessaoAtiva();
  }
}
