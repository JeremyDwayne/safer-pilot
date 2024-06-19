package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"regexp"
	"strings"
)

type (
	Knowledge map[string]string
	Risks     map[string]string
	Skills    map[string]string
)

// Define your structures for JSON
type Task struct {
	ID         string            `json:"ID"`
	References []string          `json:"References"`
	Objective  string            `json:"Objective"`
	Knowledge  map[string]string `json:"Knowledge"`
	Risks      Risks             `json:"Risk"`
	Skills     Skills            `json:"Skills"`
}

type Section struct {
	ID    string          `json:"ID"`
	Tasks map[string]Task `json:"Tasks"`
}

func main() {
	// Open the file
	file, err := os.Open("ppl_acs.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	// Read the file
	scanner := bufio.NewScanner(file)
	var documentText string
	for scanner.Scan() {
		documentText += scanner.Text() + "\n"
	}

	// Define regex patterns
	// Capture the section ID, title, and all content of the section
	sectionPattern := regexp.MustCompile(`^([IVXLCDM]*)\. (.*\n)([\s\S]*?)(?:\n*^[IVXLCDM]+\. |$)`)
	// Capture the task ID, title, and all content of the task
	taskPattern := regexp.MustCompile(`^Task ([A-Z])\. (.+)([\s\S]*?)(?:\n*^Task|$)`)

	// Capture the references, objective, knowledge, risk, and skills of the task
	// Each of these will find all submatches, which will be processed individually
	referencePattern := regexp.MustCompile(`References ([\s\S]*?)(?:\n*Objective\s)`)
	objectivePattern := regexp.MustCompile(`Objective\s([\s\S]*?)(?:\n*Knowledge\s)`)
	knowledgePattern := regexp.MustCompile(`(PA\.([IVXLCDM]*)\.([A-Z]*)\.*(K\w*))\s(.*?)(?:\n*PA|Risk)`)
	riskPattern := regexp.MustCompile(`(PA\.([IVXLCDM]*)\.([A-Z]*)\.*(R\w*))\s([\s\S]*?)(?:\n*PA|Skills)`)
	// The skills pattern is slightly different, as it is the last item in the task
	// there is some extra logic to handle the section id being included on every page
	skillsPattern := regexp.MustCompile(`(PA\.([IVXLCDM]*)\.([A-Z]*)\.(S\w*))\s([\s\S]*?)(?:[IVXLCDM]+\. |\n*PA|\n*Task|\n+\d)`)

	// Initialize the JSON structure
	documentJSON := make(map[string]Section)

	// Find all sections
	sections := sectionPattern.FindAllStringSubmatch(documentText, -1)

	// Process each section
	for _, sectionMatch := range sections {
		sectionID := sectionMatch[1]
		sectionTitle := strings.ReplaceAll(sectionMatch[2], "\n", "")

		sectionContent := sectionMatch[3]

		// Find all tasks within the section
		tasks := taskPattern.FindAllStringSubmatch(sectionContent, -1)

		// Initialize the section in the JSON structure
		section := Section{ID: sectionID, Tasks: make(map[string]Task)}

		for _, taskMatch := range tasks {
			taskID := taskMatch[1]
			taskTitle := strings.ReplaceAll(taskMatch[2], "\n", "")
			taskContent := taskMatch[3]

			// Find references and objectives within the task
			references := referencePattern.FindStringSubmatch(taskContent)
			objectives := objectivePattern.FindStringSubmatch(taskContent)

			riskItems := make(map[string]map[string]map[string]string)
			skillsItems := make(map[string]map[string]map[string]string)

			knowledge := knowledgePattern.FindAllStringSubmatch(taskContent, -1)
			knowledgeItems := map[string]map[string]map[string]string{sectionID: {taskID: make(map[string]string)}}
			for _, sub := range knowledge {
				val := strings.ReplaceAll(sub[5], "\n", " ")
				if sectionID == sub[2] && taskID == sub[3] {
					knowledgeItems[sectionID][taskID][sub[4]] = val
				}
			}

			risk := riskPattern.FindAllStringSubmatch(taskContent, -1)
			for _, sub := range risk {
				if sectionID == sub[2] && taskID == sub[3] {
					riskItems[sectionID] = make(map[string]map[string]string)
					riskItems[sectionID][taskID] = make(map[string]string)
					riskItems[sectionID][taskID][sub[4]] = strings.ReplaceAll(sub[5], "\n", " ")
				}
			}

			skills := skillsPattern.FindAllStringSubmatch(taskContent, -1)
			for _, sub := range skills {
				if sectionID == sub[2] && taskID == sub[3] {
					skillsItems[sectionID] = make(map[string]map[string]string)
					skillsItems[sectionID][taskID] = make(map[string]string)
					skillsItems[sectionID][taskID][sub[4]] = strings.ReplaceAll(sub[5], "\n", " ")
				}
			}

			// Initialize the task in the JSON structure
			fmt.Println(knowledgeItems)
			task := Task{
				ID:         taskID,
				References: toArray(getMatch(references, 1), ",;\n"),
				Objective:  getMatch(objectives, 1),
				Knowledge:  knowledgeItems[sectionID][taskID],
				Risks:      riskItems[sectionID][taskID],
				Skills:     skillsItems[sectionID][taskID],
			}

			// fmt.Println(task)

			section.Tasks[taskTitle] = task
		}

		documentJSON[sectionTitle] = section
	}

	// Convert the map to a JSON string
	documentJSONString, _ := json.MarshalIndent(documentJSON, "", "  ")

	// Output the JSON string
	// fmt.Println(string(documentJSONString))

	// Save the JSON data to a file
	err = os.WriteFile("document.json", documentJSONString, 0644)
	if err != nil {
		fmt.Println("Error writing JSON to file:", err)
	}
}

// Helper function to safely extract matches from regex
func getMatch(matches []string, index int) string {
	if len(matches) > index {
		return matches[index]
	}
	return ""
}

func toArray(str string, sep string) []string {
	arr := strings.FieldsFunc(str, func(r rune) bool {
		return strings.ContainsRune(sep, r)
	})
	for i, s := range arr {
		arr[i] = strings.TrimSpace(s)
	}
	return arr
}
