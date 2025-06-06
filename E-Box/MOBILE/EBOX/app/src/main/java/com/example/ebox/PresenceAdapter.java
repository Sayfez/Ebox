package com.example.ebox;

import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.ebox.models.PresenceResponse;

import java.util.List;

public class PresenceAdapter extends RecyclerView.Adapter<PresenceAdapter.ViewHolder> {

    private List<PresenceResponse.PresenceData> presenceList;

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView dateSeance;
        public TextView matiere;
        public TextView etat;

        public ViewHolder(View view) {
            super(view);
            dateSeance = view.findViewById(R.id.dateSeance);
            matiere = view.findViewById(R.id.matiere);
            etat = view.findViewById(R.id.etat);
        }
    }

    public PresenceAdapter(List<PresenceResponse.PresenceData> presenceList) {
        this.presenceList = presenceList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_presence, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        PresenceResponse.PresenceData presence = presenceList.get(position);
        holder.dateSeance.setText(presence.IdSeance.DateSc);
        holder.matiere.setText(presence.IdSeance.IdMatiere.NomMatiere);
        holder.etat.setText(presence.Etat ? "Present" : "Absent");

        // Set background color based on presence state
        int backgroundColor = presence.Etat ? R.color.presentColor : R.color.absentColor;
        holder.itemView.setBackgroundResource(backgroundColor);
    }


    @Override
    public int getItemCount() {
        return presenceList.size();
    }
}
