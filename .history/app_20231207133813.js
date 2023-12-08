import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import SongRoutes from "../songs/routes";

// const express = require('express');
const app = express();
const port = 4000;
// const cors = require('cors');

// mongoose.connect(CONNECTION_STRING);
mongoose.connect("mongodb://127.0.0.1:27017/musify");

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
app.post('/api/search', (req, res) => {
    const { searchTerm, searchType } = req.body;

    // Implement your search logic here.
    // This could be a database query or some other search operation.

    // For example purposes, let's assume the search returns an array of results.
    const searchResults = performSearch(searchTerm, searchType);

    // Send the search results back to the client
    res.json(searchResults);
});

function performSearch(searchTerm, searchType) {
    // Replace this with actual search logic
    return [
        // Mock search results
        { title: "Result 1", description: "Description of result 1" },
        // ... more results
    ];
}
app.use(express.json())
SongRoutes(app);

app.listen(4000)