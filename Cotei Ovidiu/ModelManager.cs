using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
// Class: ModelManager
// Desc: Contine toate metodele pentru functionalitatea
//       sistemului de activare si dezactivare a modelelor
//       3D atunci cand acestea sunt selectate din meniu.
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
public class ModelManager : MonoBehaviour {

    public GameObject[] models;

    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    // Method: Start
    // Desc: Folosita pentru initializarea referintelor atunci
    //       cand aplicatia porneste.
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    private void Start()
    {
        DisableAll(); // Dezactivam modelele la pornirea aplicatiei.
    }

    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    // Method: DisableAll
    // Desc: Folosita pentru dezactivarea tuturor modelelor din
    //       array-ul models.
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    private void DisableAll()
    {
        // Fiecare item selectat din array-ul models se va dezactiva.
        foreach(var item in models)
        {
            item.SetActive(false);
        }
    }

    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    // Method: SetModel
    // Desc: Folosita pentru activarea modelelor din array-ul models
    //       pe baza unui index predefinit in evenimentul OnClick
    //       din Inspector.
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    private void SetModel(int index)
    {
        // Dezacivare celelalte modele inaite de activarea unui model
        DisableAll();
        models[index].SetActive(true);
    }
}