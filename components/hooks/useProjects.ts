"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import { supabase } from "@/lib/supabase";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Planning");

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Gagal ambil data:", error);
    } else if (data) {
      setProjects(data as Project[]);
    }
  };

  useEffect(() => {
    fetchProjects(); 
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

  const saveProject = async () => {
    if (!name.trim() || !type.trim()) return;

    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    if (editingId) {
      const { error } = await supabase
        .from('projects')
        .update({ name: name.trim(), type: type.trim(), status, lastUpdated: today })
        .eq('id', editingId);
        
      if (!error) {
        setProjects(projects.map(p => p.id === editingId ? { ...p, name: name.trim(), type: type.trim(), status, lastUpdated: today } : p));
      }
    } else {
      const newProject = {
        name: name.trim(),
        type: type.trim(),
        status: status,
        lastUpdated: today,
      };
      
      const { data, error } = await supabase
        .from('projects')
        .insert([newProject])
        .select();
        
      if (!error && data) {
        setProjects([data[0] as Project, ...projects]);
      }
    }
    closeModal();
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
      
    if (!error) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  const duplicateProject = async (project: Project) => {
    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    
    const duplicatedProject = {
      name: `${project.name} (Copy)`,
      type: project.type,
      status: project.status,
      lastUpdated: today,
    };
    
    const { data, error } = await supabase
      .from('projects')
      .insert([duplicatedProject])
      .select();
      
    if (!error && data) {
      setProjects([data[0] as Project, ...projects]);
    }
  };

  return {
    projects, open, openModal, openEditModal, closeModal,
    name, setName, type, setType, status, setStatus,
    saveProject, deleteProject, duplicateProject, editingId,
  };
}