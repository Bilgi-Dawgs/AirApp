import * as employeeService from "../services/employeeService.js";
import { CustomError } from "../middlewares/customError.js";

export const getEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = await employeeService.getEmployeeById(id);
  res.status(200).json({ employee });
};

export const getByFlight = async (req, res) => {
  const { flightId } = req.params;
  const list = await employeeService.getEmployeesByFlight(flightId);
  res.status(200).json({ employees: list });
};

export const assignFlight = async (req, res) => {
  const { id } = req.params;
  const { assignedFlightId } = req.body;
  const updated = await employeeService.assignFlight(id, assignedFlightId);
  res.status(200).json({ updated });
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await employeeService.updateStatus(id, status);
  res.status(200).json({ updated });
};

// admin
export const listEmployees = async (req, res) => {
  const employees = await employeeService.getAllEmployees(req.query);
  res.status(200).json({ employees });
};

export const createEmployee = async (req, res) => {
  const data = req.body;
  const created = await employeeService.createEmployee(data);
  res.status(201).json({ employee: created });
};

export const replaceEmployee = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const replaced = await employeeService.replaceEmployee(id, data);
  res.status(200).json({ replaced });
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  await employeeService.deleteEmployeeById(id);
  res.status(204).send();
};

// internal
export const internalList = async (req, res) => {
  const employees = await employeeService.getAllEmployees(req.query);
  res.status(200).json({ employees });
};

export const internalAvailable = async (req, res) => {
  const employees = await employeeService.getAvailableEmployees();
  res.status(200).json({ employees });
};

export const internalPatchStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await employeeService.updateStatus(id, status);
  res.status(200).json({ updated });
};

export const internalAssign = async (req, res) => {
  const { id, flightId } = req.params;
  const updated = await employeeService.assignFlight(id, flightId);
  res.status(200).json({ updated });
};
