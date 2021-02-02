import { pascalCase } from "change-case"
import { move, pathExists } from "fs-extra"

import "./env"
import { getMappingConfig, mappingBackupFile, mappingFile } from "./getCurrentMapping"
import { createTextFile } from "./lib/createTextFile"
import {
  getMiteAccessToken,
  getMiteAccountName,
  getMiteProjects,
  getMiteServices,
  MiteProject,
  MiteService,
} from "./mite"
import { getTimeularAccessToken, getTimeularActivities, TimeularActivity } from "./timeular"

function formatTimeularActivity(activity: TimeularActivity) {
  return pascalCase(activity.name)
}

function formatMiteProject(mite: MiteProject) {
  const customer = pascalCase(mite.project.customer_name)
  const project = pascalCase(mite.project.name)

  return `${customer}__${project}`
}

function formatMiteService(mite: MiteService) {
  const service = pascalCase(mite.service.name)
  const billable = mite.service.billable ? "Billable" : "NonBillable"

  return `${service}__${billable}`
}

async function main() {
  const timeularAccessToken = await getTimeularAccessToken()
  const miteAccountName = getMiteAccountName()
  const miteAccessToken = getMiteAccessToken()

  const timeularActivities = await getTimeularActivities(timeularAccessToken)
  const miteProjects = await getMiteProjects(miteAccountName, miteAccessToken)
  const miteServices = await getMiteServices(miteAccountName, miteAccessToken)

  const mapping = await getMappingConfig({ required: false })

  if (await pathExists(mappingFile)) {
    await move(mappingFile, mappingBackupFile)
  }

  await createTextFile(mappingFile, lines => {
    lines.push(`enum TimeularActivity {`)
    timeularActivities.activities.forEach(activity => {
      const activityName = formatTimeularActivity(activity)
      lines.push(`${activityName} = "${activity.id}",`)
    })
    lines.push(`}`)
    lines.push(``)

    lines.push(`enum MiteProject {`)
    lines.push(`None = "",`)
    miteProjects.forEach(mite => {
      const projectName = formatMiteProject(mite)
      lines.push(`${projectName} = ${mite.project.id},`)
    })
    lines.push(`}`)
    lines.push(``)

    lines.push(`enum MiteService {`)
    lines.push(`None = "",`)
    miteServices.forEach(mite => {
      const serviceName = formatMiteService(mite)
      lines.push(`${serviceName} = ${mite.service.id},`)
    })
    lines.push(`}`)
    lines.push(``)

    lines.push(`export const mapping: {`)
    lines.push(`[id: string]: { project: MiteProject, service: MiteService }`)
    lines.push(`} = {`)
    timeularActivities.activities.forEach(activity => {
      const projectId = mapping[activity.id]?.project
      const serviceId = mapping[activity.id]?.service

      const project = miteProjects.find(mite => mite.project.id === projectId)
      const service = miteServices.find(mite => mite.service.id === serviceId)

      const projectName = project ? formatMiteProject(project) : "None"
      const serviceName = service ? formatMiteService(service) : "None"

      lines.push(`[TimeularActivity.${pascalCase(activity.name)}]: {`)
      lines.push(`project: MiteProject.${projectName},`)
      lines.push(`service: MiteService.${serviceName},`)
      lines.push(`},`)
    })
    lines.push(`}`)
    lines.push(``)
  })
}

main().catch(console.error)
