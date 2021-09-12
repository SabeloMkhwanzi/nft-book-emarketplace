import React, { useState } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc =
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//const url = "https://ipfs.infura.io/ipfs/Qmezv6hG8AFmDmHuT2gv23PXTVEzhJffcQ9pvCsaCyD75b"

export default function Test() {
 const [numPages, setNumPages] = useState(null);
 const [pageNumber, setPageNumber] = useState(1);






/*To Prevent right click on screen*/
//  document.addEventListener('contextmenu',function(event){
//     event.preventDefault();
//  },true);
	
// /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
 	setNumPages(numPages);
 	setPageNumber(1); }

// function changePage(offset) {
// 	setPageNumber(prevPageNumber => prevPageNumber + offset);
// }

// function previousPage() {
// 	changePage(-1);
// }

// function nextPage() {
// 	changePage(1);
// }

return (
	<>
	<div className="main">
	<Document
	file={"https://ipfs.infura.io/ipfs/Qmezv6hG8AFmDmHuT2gv23PXTVEzhJffcQ9pvCsaCyD75b"}
		 onLoadSuccess={onDocumentLoadSuccess}
	>
		 
	</Document>


	{/* <div>
		<div className="pagec">
		Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
		</div>
		<div className="buttonc">
		<button
		type="button"
		disabled={pageNumber <= 1}
		onClick={previousPage}
		className="Pre"
		
		// https://ipfs.infura.io/ipfs/Qmezv6hG8AFmDmHuT2gv23PXTVEzhJffcQ9pvCsaCyD75b

		>
		Previous
		</button>
		<button
		type="button"
		disabled={pageNumber >= numPages}
		onClick={nextPage}
		
		>
		Next
		</button>
		</div>
	</div> */}
	</div>
	</>
);
}
