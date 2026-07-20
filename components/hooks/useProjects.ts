"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import { getProjects, saveProjects } from "@/lib/projects";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Planning");

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const openModal = () => {
    setEditingId(null);
    setName("");
    setType("");
    setStatus("Planning");
    setOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingId(project.id);
    setName(project.name);
    setType(project.type);
    setStatus(project.status);
    setOpen(true);
  };
  
  const closeModal = () => {
    setOpen(false);
    setEditingId(null);
    setName("");
    setType("");
    setStatus("Planning");
  };

  const saveProject = () => {
    if (!name.trim() || !type.trim()) return;

    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    let updatedProjects;

    if (editingId) {
      updatedProjects = projects.map((project) =>
        project.id === editingId
          ? { ...project, name: name.trim(), type: type.trim(), status, lastUpdated: today }
          : project
      );
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        name: name.trim(),
        type: type.trim(),
        status: status,
        lastUpdated: today,
      };
      updatedProjects = [newProject, ...projects];
    }
    
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
    closeModal();
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  // FITUR BARU: Duplicate Project
  const duplicateProject = (project: Project) => {
    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    
    const duplicatedProject: Project = {
      ...project,
      id: Date.now().toString(), // Bikin ID baru
      name: `${project.name} (Copy)`, // Tambahin tulisan (Copy) biar beda
      lastUpdated: today,
    };
    
    const updatedProjects = [duplicatedProject, ...projects];
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  return {
    projects, open, openModal, openEditModal, closeModal,
    name, setName, type, setType, status, setStatus,
    saveProject, deleteProject, duplicateProject, editingId,
  };
}