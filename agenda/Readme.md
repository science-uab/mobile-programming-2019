-Programul agenda este destinat programarii si alertarii pe evenimentele programate
-Fisierul html contine formularul in cadrul unei structuri de tabel precum si apelul catre 
fisierul agenda2.js
-Html-ul mai contine apelul catre fisierul w3.css(foi de stil) care permite modificarea 
culorilor interfetei aplicatiei si asezarea in pagina a elementelor
-Fisierul agenda.js ofera urmatoarele functii:
    1.defineste si preia elementele formularului si asigura preluarea informatiilor din formular precum 
	si asigura conditiile de stocare in memorie a informatiilor dupa asigurarea condiriilor "not null"
	2.asigura introducerea datei si orei preluate prin functii ale html5 si efectueaza calculul de timp ramas
	pentru asigurarea alarmarii prin vibratie a utilizatorul la 1 minut pana la expirarea timpului
	3. cand mai ramane 1 secunda pana la expirarea timpului afiseaza o alerta pop-up cu mesajul "Ai un eveniment in ateptare"
	4. asigura modificarea continutului evenimentului a orei si datei acestuia(edit(id_eveniment))
	5. asigura stergerea evenimenului din agenda (sterge(id_eveniment))
	
-La conceperea aplicatiei se putea folosi node.js pentru a asigura suportul server web si fundtiile acestuia de relationare cu baza de date, 
dar am optat pentru memorarea in ram/string pentru o sulare mai usoara si facila si eliminarea dependentei de baza de date externa.

programul mai poate fi imbunatatit.