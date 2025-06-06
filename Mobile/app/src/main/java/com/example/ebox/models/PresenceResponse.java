package com.example.ebox.models;

import java.util.List;

public class PresenceResponse {
    public String message;
    public int status;
    public List<PresenceData> data;

    public class PresenceData {
        public String _id;
        public boolean Etat;
        public IdSeance IdSeance;

        public class IdSeance {
            public String _id;
            public String DateSc;
            public IdMatiere IdMatiere;

            public class IdMatiere {
                public String _id;
                public String NomMatiere;
            }
        }
    }
}
