/* eslint-disable no-underscore-dangle */

// styles
import './assets/scss/main.scss'

import {
	Accordion,
	Alert,
	BarProgress,
	Breadcrumb,
	ButtonGroup,
	Button,
	Card,
	Carousel,
	CircularProgress,
	Datatable,
	FilePreview,
	Modal,
	Stepper,
	TableLoader,
	Tooltip,
	Tree,
	Checkbox,
	DatePicker,
	Dropdown,
	FileInput,
	Input,
	Radio,
} from '@/components'

import { setCSSVariables } from '@/utils/helper'

export const SBAccordion = Accordion
export const SBAlert = Alert
export const SBBarProgress = BarProgress
export const SBBreadcrumb = Breadcrumb
export const SBButtonGroup = ButtonGroup
export const SBButton = Button
export const SBCard = Card
export const SBCarousel = Carousel
export const SBCircularProgress = CircularProgress
export const SBDatatable = Datatable
export const SBFilePreview = FilePreview
export const SBModal = Modal
export const SBStepper = Stepper
export const SBTableLoader = TableLoader
export const SBTooltip = Tooltip
export const SBTree = Tree
export const SBCheckbox = Checkbox
export const SBDatePicker = DatePicker
export const SBDropdown = Dropdown
export const SBFileInput = FileInput
export const SBInput = Input
export const SBRadio = Radio

export const setStyleVariables = setCSSVariables

export * from './interface'
