import { StepInput } from "@/components/step-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateTemplate } from "@/helper/template-renderer";
import { useArrayState } from "@/hooks/use-array-state";
import type { Template } from "@/types/template.type";
import { Copy } from "lucide-react";
import React, { useState, useCallback } from "react";
import type { ChangeEvent } from "react";

const MergeRequestGenerator: React.FC = () => {
    const [teamsLink, setTeamsLink] = useState<string>("");
    const [currentDeployStep, setCurrentDeployStep] = useState<string>("");
    const [currentBackupStep, setCurrentBackupStep] = useState<string>("");
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deploymentSteps = useArrayState();
    const backupSteps = useArrayState();

    const handleTeamsLinkChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>): void => {
            setTeamsLink(e.target.value);
        },
        [],
    );

    const handleDeployStepChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>): void => {
            setCurrentDeployStep(e.target.value);
        },
        [],
    );

    const handleBackupStepChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>): void => {
            setCurrentBackupStep(e.target.value);
        },
        [],
    );

    const handleAddDeployStep = useCallback((): void => {
        deploymentSteps.addItem(currentDeployStep);
        setCurrentDeployStep("");
    }, [currentDeployStep, deploymentSteps]);

    const handleAddBackupStep = useCallback((): void => {
        backupSteps.addItem(currentBackupStep);
        setCurrentBackupStep("");
    }, [currentBackupStep, backupSteps]);

    const handleCopyTemplate = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        const templateData: Template = {
            teamsLink,
            deploymentSteps: deploymentSteps.items,
            backupSteps: backupSteps.items,
        };
        const template = generateTemplate(templateData);

        try {
            await navigator.clipboard.writeText(template);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy template:", err);
            const textArea = document.createElement("textarea");
            textArea.value = template;
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } finally {
            setIsLoading(false);
        }
    }, [teamsLink, deploymentSteps.items, backupSteps.items]);

    const templateData: Template = {
        teamsLink,
        deploymentSteps: deploymentSteps.items,
        backupSteps: backupSteps.items,
    };

    const template = generateTemplate(templateData);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-emerald-100 p-4 flex items-center py-10">
            <div className="mx-auto w-full md:w-6xl">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg min-h-[80vh] flex flex-col">
                    <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                        <h1 className="text-xl font-semibold text-slate-800">
                            Merge Request Template Generator
                        </h1>
                    </div>

                    <div className="grid gap-6 p-6 lg:grid-cols-2 flex-1">
                        <div className="space-y-6 flex-1">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="teams-link"
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Microsoft Teams Link
                                </Label>
                                <Input
                                    id="teams-link"
                                    type="url"
                                    value={teamsLink}
                                    onChange={handleTeamsLinkChange}
                                    placeholder="https://teams.microsoft.com/..."
                                    className="w-full"
                                />
                            </div>

                            <StepInput
                                label="Deployment Steps"
                                value={currentDeployStep}
                                onChange={handleDeployStepChange}
                                onAdd={handleAddDeployStep}
                                items={deploymentSteps.items}
                                onRemove={deploymentSteps.removeItem}
                                placeholder="Enter deployment step..."
                            />

                            <StepInput
                                label="Database Backup Requirements"
                                value={currentBackupStep}
                                onChange={handleBackupStepChange}
                                onAdd={handleAddBackupStep}
                                items={backupSteps.items}
                                onRemove={backupSteps.removeItem}
                                placeholder="Enter table or backup requirement..."
                            />
                        </div>

                        <div className="flex flex-col h-full">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-medium text-slate-800">
                                    Template Preview
                                </h2>
                                <Button
                                    onClick={handleCopyTemplate}
                                    className="flex items-center gap-2 text-slate-600"
                                    disabled={isCopied || isLoading}
                                    type="button"
                                >
                                    <Copy className="h-4 w-4" />
                                    {isCopied
                                        ? "Copied!"
                                        : isLoading
                                          ? "Copying..."
                                          : "Copy Template"}
                                </Button>
                            </div>

                            <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                                    {template}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MergeRequestGenerator;
