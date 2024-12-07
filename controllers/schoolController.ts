// import { Request, Response } from 'express';
import School from '../models/school.model';

// CREATE
export const createSchool = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const school = await School.create({ name });
    res.status(201).json(school);
  } catch (error) {
    res.status(500).json({ message: 'Error creating school', error });
  }
};

// READ (All)
export const getSchools = async (req: Request, res: Response) => {
  try {
    const schools = await School.findAll();
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schools', error });
  }
};

// READ (One)
export const getSchool = async (req: Request, res: Response) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching school', error });
  }
};

// UPDATE
export const updateSchool = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const school = await School.findByPk(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    school.name = name || school.name;
    await school.save();
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ message: 'Error updating school', error });
  }
};

// DELETE
export const deleteSchool = async (req: Request, res: Response) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    await school.destroy();
    res.status(200).json({ message: 'School deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting school', error });
  }
};
