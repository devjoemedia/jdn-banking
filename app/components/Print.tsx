import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Print = ({ rootElementId, downloadFileName,className, cb }: any) => {
  const downloadPdfDocument = () => {
    const input = document.getElementById(rootElementId) as HTMLLIElement;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "png", 0, 0, 0, 0);
      pdf.save(`${downloadFileName}.pdf`);
    });
  };

  return (<button
  className={`mt-4 py-2 px-5 w-[140px] bg-primary rounded text-white ${className && className}`}
  onClick={()=>{
    downloadPdfDocument()
    if(cb)
      cb()
  }}>
  Print
</button> )
};

export default Print;
