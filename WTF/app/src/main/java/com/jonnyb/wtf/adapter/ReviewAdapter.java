package com.jonnyb.wtf.adapter;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import com.jonnyb.wtf.R;
import com.jonnyb.wtf.holder.ReviewHolder;
import com.jonnyb.wtf.model.FoodTruckReview;
import java.util.ArrayList;


public class ReviewAdapter extends RecyclerView.Adapter<ReviewHolder> {

    private ArrayList<FoodTruckReview> reviews;

    public ReviewAdapter(ArrayList<FoodTruckReview> reviews) {
        this.reviews = reviews;
    }

    @Override
    public void onBindViewHolder(ReviewHolder holder, int position) {
        final FoodTruckReview review = reviews.get(position);
        holder.updateUI(review);
    }

    @Override
    public ReviewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View reviewCard = LayoutInflater.from(parent.getContext()).inflate(R.layout.card_review, parent, false);
        return new ReviewHolder(reviewCard);
    }

    @Override
    public int getItemCount() {
        return reviews.size();
    }
}
