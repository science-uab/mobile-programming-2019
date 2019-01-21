using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
// Class: SoundManager
// Desc: Contine toate metodele pentru functionalitatea
//       sistemului de sunet, astfel incat atunci cand 
//       utiliatorul da click pe un buton acesta va emite un
//       sunet.
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
public class SoundManager : MonoBehaviour {

    private AudioSource AS;

    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    // Method: Start
    // Desc: Folosita pentru initializarea referintelor atunci
    //       cand aplicatia porneste.
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    private void Start()
    {
        AS =  this.GetComponent<AudioSource>(); // Acesam componenta Audio Source
    }

    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    // Method: PlayClick
    // Desc: Folosita pentru pornirea sunetului la apelarea
    // evenimentului de OnClick asupra butoanelor.
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    public void PlayClick()
    {
        AS.Play();
    }
}
