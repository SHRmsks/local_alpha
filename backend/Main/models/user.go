package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// UserProfile represents a user's profile information stored in MongoDB
type UserProfile struct {
	ID                   primitive.ObjectID  `bson:"_id,omitempty" json:"id"`
	UserType    		 string              `bson:"user_type" json:"user_type"` // "general" or "vc"
	LegalName            string              `bson:"legal_name" json:"legal_name"`
	Surname              string              `bson:"surname" json:"surname"`
	PhotoProfile         string              `bson:"photo_profile" json:"photo_profile"` // URL to profile picture (required)
	DateOfBirth          *time.Time          `bson:"date_of_birth,omitempty" json:"date_of_birth,omitempty"` // Optional
	Gender               *string             `bson:"gender,omitempty" json:"gender,omitempty"`               // Optional
	Nationality          *string             `bson:"nationality,omitempty" json:"nationality,omitempty"`     // Optional
	AboutMe              *string             `bson:"about_me,omitempty" json:"about_me,omitempty"`           // Optional
	Occupation           string              `bson:"occupation" json:"occupation"`
	Company              string              `bson:"company,omitempty" json:"company,omitempty"` // Optional
	Education            []EducationEntry    `bson:"education,omitempty" json:"education,omitempty"`
	Experience           []ExperienceEntry   `bson:"experience,omitempty" json:"experience,omitempty"`
	Skills               *[]string           `bson:"skills,omitempty" json:"skills,omitempty"`                     // Optional list
	AwardsAndCertifications *[]string        `bson:"awards_and_certifications,omitempty" json:"awards_and_certifications,omitempty"` // Optional list
	Hobbies              *[]string           `bson:"hobbies,omitempty" json:"hobbies,omitempty"`                   // Optional list

	// VC-specific fields, only present if UserType == "vc"
	VCInfo 				 *VCProfile 		 `bson:"vc_info,omitempty" json:"vc_info,omitempty"`
}

// EducationEntry represents an education record
type EducationEntry struct {
	Institution string     `bson:"institution" json:"institution"`
	Degree      *string    `bson:"degree,omitempty" json:"degree,omitempty"`
	Field       *string    `bson:"field,omitempty" json:"field,omitempty"`
	StartDate   time.Time  `bson:"start_date" json:"start_date"`
	EndDate     *time.Time `bson:"end_date,omitempty" json:"end_date,omitempty"` // Optional if ongoing
}

// ExperienceEntry represents an individual job experience record
type ExperienceEntry struct {
	Company     string     `bson:"company" json:"company"`
	Role        string     `bson:"role" json:"role"`
	StartDate   time.Time  `bson:"start_date" json:"start_date"`
	EndDate     *time.Time `bson:"end_date,omitempty" json:"end_date,omitempty"` // Optional for current job
	Description *string    `bson:"description,omitempty" json:"description,omitempty"` // Optional
}

// VCProfile represents additional information for VC users
type VCProfile struct {
	VCFirm              string                `bson:"vc_firm" json:"vc_firm"`
	FocusAreas          []string              `bson:"focus_areas,omitempty" json:"focus_areas,omitempty"`
	AreaOfInterest      []string              `bson:"area_of_interest,omitempty" json:"area_of_interest,omitempty"`
	CurrentInvestments  *[]InvestmentEntry    `bson:"current_investments,omitempty" json:"current_investments,omitempty"`
	ExitedInvestments   *[]ExitedInvestmentEntry `bson:"exited_investments,omitempty" json:"exited_investments,omitempty"`
	FundsRaised         *float64              `bson:"funds_raised,omitempty" json:"funds_raised,omitempty"` // Optional, in millions or specific currency
}

// InvestmentEntry represents an active investment
type InvestmentEntry struct {
	Company        string    `bson:"company" json:"company"`
	Description    string    `bson:"description" json:"description"` // One sentence about the company
	Type          string    `bson:"type" json:"type"`               // e.g., SaaS, Fintech, Healthcare
	InvestedDate   time.Time `bson:"invested_date" json:"invested_date"`
	Location       string    `bson:"location" json:"location"`
	StartupStage   string    `bson:"startup_stage" json:"startup_stage"` // e.g., Seed, Series A, Series B
}

// ExitedInvestmentEntry represents a past investment with exit status
type ExitedInvestmentEntry struct {
	Company        string    `bson:"company" json:"company"`
	Description    string    `bson:"description" json:"description"` // One sentence about the company
	Type          string    `bson:"type" json:"type"`               // e.g., SaaS, Fintech, Healthcare
	InvestedDate   time.Time `bson:"invested_date" json:"invested_date"`
	Location       string    `bson:"location" json:"location"`
	StartupStage   string    `bson:"startup_stage" json:"startup_stage"`
	ExitStatus     string    `bson:"exit_status" json:"exit_status"` // e.g., IPO, Acquisition, Failed
}