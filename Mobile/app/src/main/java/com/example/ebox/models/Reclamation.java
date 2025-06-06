// Reclamation.java
package com.example.ebox.models;

import java.util.List;

public class Reclamation {
    private String Objet;
    private String Message;
    private List<String> IdUser;

    public Reclamation(String objet, String message, List<String> idUser) {
        this.Objet = objet;
        this.Message = message;
        this.IdUser = idUser;
    }

    // Getters and setters (if needed)
}
