import { ModeToggle } from "@/components/mode-toggle";
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
        <div className="flex min-h-screen items-center bg-gradient-to-br from-amber-50 via-yellow-50 to-emerald-100 p-4 py-5 md:py-10 dark:from-slate-950 dark:via-cyan-950 dark:to-emerald-950">
            <div className="mx-auto w-full md:w-6xl">
                <div className="flex min-h-[80vh] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-950">
                    <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                            Merge Request Template Generator
                        </h1>
                        <ModeToggle />
                    </div>

                    <div className="grid flex-1 gap-6 p-6 lg:grid-cols-2">
                        <div className="flex-1 space-y-6">
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
                                    className="w-full dark:bg-slate-800"
                                />
                            </div>

                            <StepInput
                                label="Deployment Steps"
                                value={currentDeployStep}
                                onChange={handleDeployStepChange}
                                onAdd={handleAddDeployStep}
                                items={deploymentSteps.items}
                                onRemove={deploymentSteps.removeItem}
                                onEdit={deploymentSteps.editItem}
                                placeholder="Enter deployment step"
                            />

                            <StepInput
                                label="Database Backup Requirements"
                                value={currentBackupStep}
                                onChange={handleBackupStepChange}
                                onAdd={handleAddBackupStep}
                                items={backupSteps.items}
                                onRemove={backupSteps.removeItem}
                                onEdit={backupSteps.editItem}
                                placeholder="Enter backup requirement"
                            />
                        </div>

                        <div className="flex h-full flex-col">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                                    Template Preview
                                </h2>
                                <Button
                                    asChild
                                    onClick={handleCopyTemplate}
                                    className="border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-950"
                                    disabled={isCopied || isLoading}
                                    type="button"
                                >
                                    <div className="flex items-center gap-2">
                                        <Copy className="h-4 w-4" />
                                        {isCopied
                                            ? "Copied!"
                                            : isLoading
                                              ? "Copying..."
                                              : "Copy Template"}
                                    </div>
                                </Button>
                            </div>

                            <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-slate-200">
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
