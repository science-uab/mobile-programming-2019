using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
// Class: RotateModels
// Desc: Contine toate metodele pentru functionalitatea
//       sistemului de rotire a meniului vizualizat in 3D.
//       Acesta se roteste la procesului de swipe pe ecranul
//       telefonului.
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
public class RotateModels : MonoBehaviour {

    float rotateSpeed = 100;

    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    // Method: OnMouseDrag
    // Desc: Este apelata atunci cand utilizatorul da click 
    //       (atinge)pe un elemenu GUI sau Collider
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    private void OnMouseDrag()
    {
        float X = Input.GetAxis("Mouse X") * rotateSpeed * Mathf.Deg2Rad;
        transform.Rotate(Vector3.up, -X);
    }
}
