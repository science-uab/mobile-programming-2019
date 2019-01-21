using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
// Class: AutoResizeGridElement
// Desc: Contine toate metodele pentru functionalitatea
//       sistemului de Auto Resize asupra elementelor
//       aflate in parintele Grid Layout.
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
public class AutoResizeGridElement : MonoBehaviour {

    private Canvas canvas;
    private GridLayoutGroup gridLayout;

    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    // Method: Start
    // Desc: Folosita pentru initializarea referintelor atunci
    //       cand aplicatia porneste.
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    private void Start()
    {
        canvas = this.GetComponentInParent<Canvas>(); // Accesam (facem referinta) componenentei Canvas
        gridLayout = this.GetComponent<GridLayoutGroup>(); // Accesam (facem referinta) componenentei GridLayoutGroup
    }

    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    // Method: Update
    // Desc: Folosita pentru actualizarea frecventa la fiecare
    //       cadru pe secunda la rularea aplicatiei.
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    private void Update()
    {
        AutoResize(); // Apelam functia AutoResie pentru actualizare frecventa.
    }

    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    // Method: AutoResize
    // Desc: Folosita pentru a calcula size-ul canvas-ului.
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    private void AutoResize()
    {
        float cellX = canvas.pixelRect.width * 0.1916f;
        float cellY = canvas.pixelRect.height * 0.82f / 3;
        gridLayout.cellSize = new Vector2(cellX, cellY);
    }
}