export class PdfBuffer {
    blob: Buffer;
    arquivoNome: string;
    constructor(blob: Buffer, arquivoNome: string){
      this.blob = blob;
      this.arquivoNome = arquivoNome;
    }
  }