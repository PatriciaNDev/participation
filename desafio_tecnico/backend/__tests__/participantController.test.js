// Importing controller functions to be tested
const {
  getParticipants,
  getParticipant,
  addParticipant,
  updateParticipantDetails,
  removeParticipant
} = require("../controllers/participantController");

// Importing model functions that interact with the database
const {
  getAllParticipants,
  getParticipantById,
  createParticipant,
  updateParticipantPercentage,
  deleteParticipant
} = require("../models/participant");

// Importing model functions that interact with the database
const httpMocks = require("node-mocks-http");

// Mocking the participant model functions using Jest
jest.mock("../models/participant", () => ({
  getAllParticipants: jest.fn(),
  getParticipantById: jest.fn(),
  createParticipant: jest.fn(),
  updateParticipantPercentage: jest.fn(),
  deleteParticipant: jest.fn()
}));

// Describing the tests for Participant Controller
describe("Participant Controller", () => {

  // Test suite for the getParticipants function
  describe("getParticipants", () => {
    it("Must get all participants and calculate remaining participation", async () => {
      
      // Mock participants data
      const participants = [
        { id_participant: 1, first_name: "Carlos", last_name: "Moura", percentage: 5 },
        { id_participant: 2, first_name: "Fernanda", last_name: "Oliveira", percentage: 15 },
      ];

      // Mock the response of getAllParticipants to return the mock data
      getAllParticipants.mockResolvedValue(participants);

      // Creating mock request and response objects
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      res.json = jest.fn();

      // Call the getParticipants function
      await getParticipants(req, res);

      // Expect the response to have been called with the correct data
      expect(res.json).toHaveBeenCalledWith({
        participants,
        remaining: 80
      });
    });

    it("Must handle errors", async () => {

      // Mock the response of getAllParticipants to reject with an error
      getAllParticipants.mockRejectedValue(new Error("Database error"));

       // Creating mock request and response objects
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();

      // Call the getParticipants function
      await getParticipants(req, res);

      // Expect the response to have been called with an error message
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch participants" });
    });
  });

  // Test suite for the getParticipant function
  describe("getParticipant", () => {
    it("Must get a participant by ID", async () => {
      
      // Mock participant data
      const participant = { id_participant: 1, first_name: "Carlos", last_name: "Moura", percentage: 5 };

      // Mock the response of getParticipantById to return the mock data
      getParticipantById.mockResolvedValue(participant);

      // Creating mock request and response objects
      const req = httpMocks.createRequest({ params: { id_participant: 1 } });
      const res = httpMocks.createResponse();
      res.json = jest.fn();

      // Call the getParticipant function
      await getParticipant(req, res);

      // Expect the response to have been called with the correct data
      expect(res.json).toHaveBeenCalledWith(participant);
    });
    
    it("Must return 404 if participant not found", async () => {

      // Mock the response of getParticipantById to return null
      getParticipantById.mockResolvedValue(null);

      // Creating mock request and response objects
      const req = httpMocks.createRequest({ params: { id_participant: 1 } });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();

      // Call the getParticipant function
      await getParticipant(req, res);

      // Expect the response to have been called with a 404 status and error message
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Participant not found" });
    });

    it("Must handle errors", async () => {

      // Mock the response of getParticipantById to reject with an error
      getParticipantById.mockRejectedValue(new Error("Database error"));

      // Creating mock request and response objects
      const req = httpMocks.createRequest({ params: { id_participant: 1 } });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();

      // Call the getParticipant function
      await getParticipant(req, res);

      // Expect the response to have been called with a 500 status and error message
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch participant" });
    });
  });

  // Test suite for the addParticipant function
  describe("addParticipant", () => {
    it("Must add a new participant", async () => {

      // Mock new participant data and created participant data
      const newParticipant = { first_name: "Fernanda", last_name: "Oliveira", percentage: 15 };
      const createdParticipant = { id_participant: 2, ...newParticipant };
      
      // Mock the response of getAllParticipants and createParticipant
      getAllParticipants.mockResolvedValue([]);
      createParticipant.mockResolvedValue(createdParticipant);
      
      // Creating mock request and response objects
      const req = httpMocks.createRequest({ body: newParticipant });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();
      
      // Call the addParticipant function
      await addParticipant(req, res);
      
      // Expect the response to have been called with the correct status and data
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdParticipant);
    });
  
    it("Must not add a participant if total participation exceeds 100%", async () => {
      
      // Mock new participant data and existing participants data
      const newParticipant = { first_name: "Carlos", last_name: "Moura", percentage: 60 };
      const existingParticipants = [
        { id_participant: 1, first_name: "Fernanda", last_name: "Oliveira", percentage: 50 },
      ];
      
      // Mock the response of getAllParticipants
      getAllParticipants.mockResolvedValue(existingParticipants);
      
      // Creating mock request and response objects
      const req = httpMocks.createRequest({ body: newParticipant });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();
      
      // Call the addParticipant function
      await addParticipant(req, res);
      
      // Expect the response to have been called with a 400 status and error message
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Total participation cannot exceed 100%. Maximum allowed participation for new participant is 50%."
      });
    });
  
    it("Must handle errors", async () => {
      
      // Mock new participant data
      const newParticipant = { first_name: "Fernanda", last_name: "Oliveira", percentage: 15 };
      
      // Mock the response of getAllParticipants to reject with an error
      getAllParticipants.mockRejectedValue(new Error("Database error"));
      
      // Creating mock request and response objects
      const req = httpMocks.createRequest({ body: newParticipant });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();
      
      // Call the addParticipant function
      await addParticipant(req, res);
      
      // Expect the response to have been called with a 500 status and error message
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to create participant" });
    });
  });
  
  // Test suite for the updateParticipantDetails function
  describe("updateParticipantDetails", () => {
    it("Must update a participant", async () => {
      
      // Mock updated participant data and existing participants data
      const updatedParticipant = { id_participant: 1, first_name: "Fernanda", last_name: "Oliveira", percentage: 15 };
      const existingParticipants = [
        { id_participant: 1, first_name: "Fernanda", last_name: "Oliveira", percentage: 10 },
        { id_participant: 2, first_name: "Carlos", last_name: "Moura", percentage: 50 },
      ];

      // Mock the response of getAllParticipants and updateParticipantPercentage
      getAllParticipants.mockResolvedValue(existingParticipants);
      updateParticipantPercentage.mockResolvedValue(updatedParticipant);
      
      // Creating mock request and response objects
      const req = httpMocks.createRequest({ params: { id_participant: 1 }, body: { percentage: 15 } });
      const res = httpMocks.createResponse();
      res.json = jest.fn();
      
      // Call the updateParticipantDetails function
      await updateParticipantDetails(req, res);
      
      // Expect the response to have been called with the correct data
      expect(res.json).toHaveBeenCalledWith(updatedParticipant);
    });
    
    it("Must not update a participant if total participation exceeds 100%", async () => {
      
      // Mock updated participant data and existing participants data
      const updatedParticipant = { id_participant: 1, first_name: "Fernanda", last_name: "Oliveira", percentage: 60 };
      const existingParticipants = [
        { id_participant: 1, first_name: "Fernanda", last_name: "Oliveira", percentage: 50 },
        { id_participant: 2, first_name: "Carlos", last_name: "Moura", percentage: 50 },
      ];

      // Mock the response of getAllParticipants
      getAllParticipants.mockResolvedValue(existingParticipants);
      
      // Creating mock request and response objects
      const req = httpMocks.createRequest({ params: { id_participant: 1 }, body: { percentage: 60 } });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();
      
      // Call the updateParticipantDetails function
      await updateParticipantDetails(req, res);
      
      // Expect the response to have been called with a 400 status and error message
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Total participation cannot exceed 100%. Maximum allowed participation for updated participant is 50%."
      });
    });
  
    it("Must handle errors", async () => {
      // Mock updated participant data
      const updatedParticipant = { id_participant: 1, first_name: "Fernanda", last_name: "Oliveira", percentage: 15 };
      
      // Mock the response of getAllParticipants to reject with an error
      getAllParticipants.mockRejectedValue(new Error("Database error"));
      
      // Creating mock request and response objects
      const req = httpMocks.createRequest({ params: { id_participant: 1 }, body: { percentage: 15 } });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();
      
      // Call the updateParticipantDetails function
      await updateParticipantDetails(req, res);
      
      // Expect the response to have been called with a 500 status and error message
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to update participant" });
    });
  }); 

  // Test suite for the removeParticipant function
  describe("removeParticipant", () => {
    it("Must remove a participant", async () => {
      
      // Mock the existing participant and the response of deleteParticipant to return a success message
      const existingParticipant = { id_participant: 1, first_name: "Carlos", last_name: "Moura", percentage: 5 };
      const deleteResult = { message: "Participant deleted successfully" };
    
      // Mock the response of getAllParticipants to return the existing participant
      getAllParticipants.mockResolvedValue([existingParticipant]);
      
      // Mock the response of deleteParticipant to return the success message
      deleteParticipant.mockResolvedValue(deleteResult);
    
      // Creating mock request and response objects
      const req = httpMocks.createRequest({ params: { id_participant: 1 } });
      const res = httpMocks.createResponse();
    
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();
    
      // Call the removeParticipant function
      await removeParticipant(req, res);
      
      // Expect deleteParticipant to have been called with the correct ID
      expect(deleteParticipant).toHaveBeenCalledWith(1);

      // Expect the response to have been called with the correct status and message
      expect(res.status).toHaveBeenCalledWith(200);   
      expect(res.json).toHaveBeenCalledWith(deleteResult);
    });
    
    it("Must handle errors", async () => {
      
      // Mock the response of deleteParticipant to reject with an error
      deleteParticipant.mockRejectedValue(new Error("Database error"));

      // Creating mock request and response objects
      const req = httpMocks.createRequest({ params: { id_participant: 1 } });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();

      // Call the removeParticipant function
      await removeParticipant(req, res);

      // Expect the response to have been called with a 500 status and error message
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to delete participant" });
    });
  });
});
