const textExample = {
  "text": "MPRESO POR ALIANZA Bas Dose-N\nCEDENAR\nCentrales Eléctricas de Nariño S.A. E.S.P.\n801200000-0\n2006-12 7336900\nNOMBRE\nDATOS DEL CLIENTE\nJENIFER LICED ENRIQUEZ FIGUEROA RAD-10591\nMZ L CS 16-GUALCALOMA IV\nCÓDIGO INTERNO\nCE 1185250-4\n3002428060-97\nPASTO\nABR/2020\nC\n150 9001\ncontec\nTN-CO1600813\nDIRECCIÓN PREDIO\nMUNICIPIO\nDIRECCIÓN ENTREGA\nPERIODO FACTURADO\nI Net)\nTIPO DE USO\nESTRATO\nNIVEL\nVIVIENDA\n2\n1\nCARGA\n4,564\nCICLO-RUTA\n31 0410-4095\nCO-TR CO0013\nCARGOS POR SERVICIO Y OTROS CONCEPTOS\nCONCEPTO\n100-ENERGIA ACTIVA SENCILLA MONOMIA S 590,44KWH\n199 AJUSTE MONETARIO\n-2.32\n701-DESCUENTO POR PAGO OPORTUNO DECRETO 517-2020\n730-SUBSIDIO de 0-130 KWH 46.45%\nVALOR MES\n113.364,45\n7.743,44\n35 653,72\nSEÑOR USUARIO:\nPor el pago oportuno de la factura\nde marzo de 2020, tiene un\ndescuento del 10% sobre el valor\ndel consumo de marzo/2020.\nSi no pudo pagar el valor deli\nconsumo de energía eléctrica del\nmes de marzo de 2020, esta fue\nfinanciada a 24 cuotas, con 2 meses\nde gracia.\nDecreto legislativo 517/2020.\nResolución CREG 058/2020.\nSALDO ANTERIOR\n00\n8888\nTOTAL\n113.364,48\n2.32\n7.743,44\n35.653,72\nTOTALES\nTIPO DE CONSUMO\nCONTADORES ANTERIOR ACTUAL\nLECTURA LECTURA CONSUMO DEL\nACTIVA SENCILLA COM\n1\n5138\n5330\nPERIODO\n192\nDATOS DEL CONSUMO\nCALCULADO\nPOR\nDiferencia de lec\nCONSUMOS ANTERIORES KWh\n143\n192\n164\n185\n138\n85\n93\nPROM\nMAR-20\nFEB 20 ENE-20 DIC-19\nNOV-19\nOCT-19\nOur 590.44\n=216,97\nESTA FACTURA PRESTA MERITO EJECUTIVO DE ACUERDO A LAS NORMAS DEL DERECHO CMLY COMERCIAL LEY 142 ART 130\n69,965,00\n.00\n63.965.00\nANOMALIA DE\nLECTURA\nотков\nCONTUMOS\nо\nCAUSADOS\nCONSUMO\nTOTAL\n112\nPERIODO\nLIQUIDACIÓN DEL BENEFICIO FOES\nNo FACTURA\nCONSUMO BASE\nSKWH\nCOMPONENTES COSTO DE PRESTACION DEL SERVICIO\n+33,62\n+ D 186,21\n113.97 +\nINDICADORES DE CALIDAD\n+2\nGERENTE\n41A09180\n00\nINFORMACION DE FINANCIACIÓN\nTIPO PLAN CAPITAL CREDITO SALDO CAPITAL NO CUOTAS\nCUOTAS CUOTAS\nFACT PAGADAS\n40,20\n,54\nPSP A\nCONCEPTOS CEDENAR EN SU HOGAR\nCONVENIO\nVALOR\nSALDOS PENDIENTES POR COBRAR\nSALDO\nVALOR ÚLTIMO PAGO\n148.820\nPERIODO FACTURADO\nFECHA ULTIMO PAGO\nPUNTO DE PAGO\n12-MAY-2020\nRED MULTICOLOR\nFACTURAS CON DEUDA\n0\nTOTAL ENERGIA\nFACTURA EXPEDIDA\n27-MAY-2020\nFECHA LIMITE DE PAGO\nFECHA DE SUSPENSION\nPASTO\nACUERDO MUNICIPAL\n00\n29-MAR-20-28-ABR-20\nMUNICIPIO\nSALDO ANTERIOR\nIMPUESTO ALUMBRADO PÚBLICO A FAVOR DEL MUNICIPIO\nRECLAMOS ALUMBRADO PÚBLICO\nTel: 7310161 Di CR 39.19-32 PALERMO Emal atencionalmohepal.gov.co\nTOTAL A PAGAR ENERGÍA Y ALUMBRADO PÚBLICO $\nPeriodo Facturado\nABR/2020\nCódigo Interno.\nCE 1185250-4\nCEDENAR\nFactura N\n3002428060-97\n08-JUN-2020\n46 DIC-2017\nVALOR DEL IMPUESTO\nCLAUSULA CCU\n5,255,00\n11.54\n$69.965,00\nTOTAL IMPUESTO ALUMBRADO PUBLICO\n$5.255,00\n$75.220\nPago oportuno\n08-JUN-2020\nCódigo Ruta\n31\n0410-4095\nTOTAL A PAGAR $\n$75.220\nCUPON BANCO PAR UNCAMENTE EN EFECTIVO\nEscaneado con CamScannell\n(415)770724632002400020)1000300242000097300000000752200320200008"
}


interface Anchor {
  startPhrase: string;
  endPhrase: string;
  anchorText?: string; // Se usa para indicar el lugar en el prompt, no se busca en el texto
}

function purifyText(receiptText: string, anchors: Anchor[]): string {
  const purifiedFragments: string[] = []; // Arreglo para almacenar las secciones purificadas

  // Normalizar y preparar el texto para coincidir con patrones
  const normalizedText = receiptText
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .toLowerCase();

  anchors.forEach(anchor => {
    const { startPhrase, endPhrase, anchorText } = anchor;

    // Normalizar las frases de anclaje para coincidencias
    const normalizedStartPhrase = startPhrase
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const normalizedEndPhrase = endPhrase
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    // Ubicar las frases en el texto
    const startIndex = normalizedText.indexOf(normalizedStartPhrase);
    const endIndex = normalizedText.indexOf(normalizedEndPhrase, startIndex);

    if (startIndex !== -1 && endIndex !== -1) {
      // Extraer y limpiar el texto entre las frases de inicio y fin
      let extractedText = receiptText
        .substring(startIndex + startPhrase.length, endIndex)
        .trim()
        .replace(/\s+/g, " "); // Eliminar espacios extra

      // Si hay un anchor, lo usamos solo para marcar la ubicación en el prompt
      if (anchorText) {
        extractedText = `(${anchorText}) ${extractedText}`; // Marcar la posición del anchor en el texto
        console.log(`Anchor found: ${anchorText}`); // Verificación de la ubicación del anchor
      }

      purifiedFragments.push(extractedText); // Almacenar en el arreglo
    }
  });

  console.log(purifiedFragments); // Verificación de las secciones purificadas
  return purifiedFragments.join("\n"); // Unir las secciones purificadas en un solo texto
}

export const anchorsForElectricBill: Anchor[] = [
  { startPhrase: "PERIODO FACTURADO", endPhrase: "TIPO DE USO" },
  { startPhrase: "VALOR DEL IMPUESTO", endPhrase: "TOTAL IMPUESTO ALUMBRADO PUBLICO" },
  { startPhrase: "TOTAL IMPUESTO ALUMBRADO PUBLICO", endPhrase: "Pago oportuno" },
  { startPhrase: "TOTAL A PAGAR", endPhrase: "CUPON BANCO" },
  { startPhrase: "DIRECCIÓN PREDIO", endPhrase: "MUNICIPIO" },
  { startPhrase: "DATOS DEL CLIENTE", endPhrase: "DIRECCIÓN PREDIO" },
  { startPhrase: "CÓDIGO INTERNO", endPhrase: "3002428060-97" },
  { startPhrase: "LECTURA CONSUMO", endPhrase: "CONSUMOS ANTERIORES KWh", anchorText: 'toma monthlyComsuption de el siguiente fragmento, el numero despues de periodo' },
];

export default purifyText;

// Código para la purificación del texto
const receiptText: string = textExample.text;
const purifiedText = purifyText(receiptText, anchorsForElectricBill);
console.log(purifiedText);
