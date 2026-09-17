import React from 'react';
import { 
  Target, 
  Briefcase, 
  Award, 
  Sparkles, 
  Zap, 
  Users, 
  GraduationCap, 
  Wrench,
  CheckCircle2
} from 'lucide-react';

export default function CardIcon({ name, className = "w-5 h-5" }) {
  switch (name) {
    case 'Target':
      return <Target className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    default:
      return <CheckCircle2 className={className} />;
  }
}
