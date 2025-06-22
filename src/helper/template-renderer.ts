import type { Template } from "@/types/template.type";

const generateTemplate = ({
    teamsLink,
    deploymentSteps,
    backupSteps,
}: Template): string => {
    const formatSteps = (steps: string[], fallback: string): string => {
        if (steps.length === 0) return fallback;
        return steps.map((step: string) => `* ${step}`).join("\n");
    };

    return `**Microsoft Teams Thread Link**\n\n${teamsLink || "No link provided"}\n\n**Deployment Steps**\n\n${formatSteps(deploymentSteps, "No deployment steps needed")}\n\n**Tables Need To Backup**\n\n${formatSteps(backupSteps, "No backup needed")}`;
};

export { generateTemplate };
