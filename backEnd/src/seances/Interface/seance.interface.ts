export interface Iseance {

    readonly DateSc: string;
    
    readonly HeureDebut: String;
   
    readonly HeureFin: String;


   
    //relations ...
    readonly IdEnseignant: string
    /*readonly IdEtudiant: String[] // many students */
    readonly IdMatiere: string
    readonly _id: string
    readonly  IdSalle: string
}