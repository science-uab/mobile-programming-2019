//ver2
			function eveniment()
			{
			   this.nume = "";
			   this.email = "";
			   this.telefon = "";
			   this.data = "";
			   this.timp = "";
			   this.evenimentul = "";
			}

		       //Variabile pentru instantiere eveniment
		    var evenimente = new Array();
			
			  //functie pentru preluarea elementului dupa id
		    function adauga(id){
			   return document.getElementById(id);
			}
			  //functia de afisare a formularului ascuns
			function afFormular(){
			   adauga("formular").style.display='inline';
			}
			   //functia de ascundere a formularului
			function adaugaFormular(){
			   adauga('nume').value = '';
			   adauga('email').value = '';
			   adauga('telefon').value = '';
			   adauga('data').value = '';
			   adauga('timp').value = '';
			   adauga('evenimentul').value = '';
			   adauga("formular").style.display='none';
			}
			    //functia de adaugare eveniment si ascundere a formularului dupa adaugare
				
			function afiseazaFormular(){//functia de adaugare eveniment si ascundere a formularului dupa adaugare			
			   evenim = new eveniment();
			   evenim.nume = adauga('nume').value;
			   evenim.email = adauga('email').value;
			   evenim.telefon = adauga('telefon').value;
			   evenim.data = adauga('data').value;
			   evenim.timp = adauga('timp').value;
			   evenim.evenimentul = adauga('evenimentul').value;			   
			   if(evenim.nume != '' && evenim.email != '' && evenim.telefon != '' && evenim.data != '' && evenim.evenimentul != ''){
				   evenimente[evenimente.length] = evenim;
			       adaugaFormular();
			       addEvenimente();
				  }
				else
				{
					alert("Toate campurile sunt obligatorii");
				}
			}
			    // functia de stergere eveniment
			function sterge(id_eveniment){
			   nouEvenim = new Array();
			   //if(confirm(Modifici sau stergi evenimentul?)){
			   for(i=0; i<evenimente.length; i++){
				   if(i != id_eveniment){
				   newEvenim[nouEvenim.length] = evenimente[i];
				   }
			   }
			   evenimente = nouEvenim;
			   addEvenimente();
			   //}
			}
			
			   //functia de editare eveniment
			function edit(id_eveniment){
				evenim = evenimente[id_eveniment];
				sterge(id_eveniment);
				afFormular();
				adauga('nume').value = evenim.nume;
				adauga('email').value = evenim.email;
				adauga('telefon').value = evenim.telefon;
				adauga('data').value = evenim.data;
				adauga('timp').value = evenim.timp;
				adauga('evenimentul').value = evenim.evenimentul;
			}
			//navigator.wakeLock.request("system").then(
			function alarma(){
					 //preluare data curenta si comparare
                     // Timp setat
                var timp_setat = new Date(evenim.data+" "+evenim.timp).getTime();          
                    // Actualizare la fiecare secunda
                var x = setInterval(function() {
                    // Preia data si ora curenta
                var ora_curenta = new Date().getTime();				
                   // Calculeaza timpul ramas
                var diferenta = timp_setat - ora_curenta; 
              			
                   // Calculul timpului ramas in zile , ore , minute si secunde
                var zile = Math.floor(diferenta / (1000 * 60 * 60 * 24));
                var ore = Math.floor((diferenta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minute = Math.floor((diferenta % (1000 * 60 * 60)) / (1000 * 60));
                var secunde = Math.floor((diferenta % (1000 * 60)) / 1000);    
                   // Amplasamentul afisarii
                 document.getElementById("timp_ramas_eveniment").innerHTML = zile + "zile " + ore + "ore "
                  + minute + "min. " + secunde + "sec. ";
                   if (diferenta < 60000 && diferenta > 1000) {                       
			           window.navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100,1000,100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100,1000]);
				   }
	               if(diferenta < 1000 && diferenta >0) {
                       clearInterval(x);
					   alert("Ai un eveniment in ateptare");
		           // window.navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100]);
		          // document.getElementById("timp_ramas_eveniment").innerHTML = "EXPIRAT"; 		   		   
	              // }
	                    }
                     }, 1000);
				   }
				 	//)						
			   // functia de adaugare eveniment in interiorul html
			function addEvenimente(){
			       //alert(evenimente.length);
			       adauga('toateEvenimentele').innerHTML = '';
			   for(i=0; i<evenimente.length; i++){
			       evenim = evenimente[i];				   
			       div = document.createElement('div');
				   div.setAttribute('class','eveniment');
				   div.innerHTML = "<div class='w3-container'>" + "<i>Nume: </i>"+evenim.nume +"<br/>"+"<i>E-mail: </i>"+
				   evenim.email +"<br/>"+"<i>Telefon: </i>"+ evenim.telefon +"<br/>"+"<i>Data: </i>"+
				   evenim.data +"<br/>"+"Ora :"+evenim.timp+"<br/>"+"<i>Eveniment: </i>"+ evenim.evenimentul+"<br/>"+
				   "<button class='w3-button w3-orange' onclick='edit("+i+")'>Edit</button>" + " "+
				   "<button  class='w3-button w3-red' onclick='sterge("+i+")'>Sterge</button>"+"   "+
				   "<button  class='w3-button w3-indigo' onclick='alarma()'>Set alarma</button>"+"<br/>"+
				   "<p id='timp_ramas_eveniment'></p>" + "<div>";
				   adauga('toateEvenimentele').appendChild(div);
			  	   //alert(new Date(evenim.data+" "+evenim.timp));                 				   

			   }
			}