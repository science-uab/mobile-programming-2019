using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
// Class: MenuManager
// Desc: Contine toate metodele pentru functionalitatea
//       meniului aplicatiei.
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
public class MenuManager : MonoBehaviour {

    public GameObject sliderObj;
    public GameObject soundManager;
    public Slider slider;
    public Text progressText;

    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    // Method: ChooseMenu
    // Desc: Folosita pentru butonul de alegere meniu, care va duce
    //       utilizatorul spre scena cu meniurile aplicatiei.
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    public void ChooseMenu(int sceneIndex)
    {
        soundManager.SendMessage("PlayClick");
        StartCoroutine(LoadAsynchronously(sceneIndex));
    }

    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    // Method: ExitApp
    // Desc: Folosita pentru butonul de iesire din aplicatie, cu
    //       ajutorul caruia utilizatorul poate parasi aplicatia.
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    public void ExitApp()
    {
        soundManager.SendMessage("PlayClick");
        Application.Quit();
    }

    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    // Method: LoadAsynchronously
    // Desc: Are capaciatea de a intrerupe executarea si a reveni
    //       astfel icat sa continue de unde a ramas.
    //       In acest caz metoda are rolul de a se executa 
    //       procesul incarcare a scenei aplicatiei astfel incat
    //       operatia asincrona scena se va reincarca doar atunci
    //       cand este terminata si toate elementele din scena
    //       sunt incarcate.
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    IEnumerator LoadAsynchronously(int sceneIndex)
    {
        AsyncOperation operation = SceneManager.LoadSceneAsync(sceneIndex);
        sliderObj.SetActive(true);

        while (!operation.isDone)
        {
            float progress = Mathf.Clamp01(operation.progress / .9f);
            Debug.Log(operation.progress);
            slider.value = progress;
            progressText.text = progress * 100f + "%";
            yield return null;
        }
    }
}